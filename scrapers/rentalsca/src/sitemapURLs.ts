import { Data, ListingsURLs } from "rentalsca";
import puppeteer from "puppeteer-core";
import { Cluster } from "ecs-helper";
import { MongoClient } from "mongodb";
import { getCities, isCity } from "./utils/cities";
import { Rentalsca } from "rentalsca.js";
import { connectToRedisDatabase } from "./utils/redis";
import { capitalizeFirstLetter } from "./utils/capitalizeFirstLetter";
import { connectToDatabase } from "./utils/mongodb";

const getSitemapURLsJob = async (
  sitemap: string,
  puppeterData: puppeteer.ConnectOptions
) => {
  let browser: puppeteer.Browser | null = null;
  try {
    browser = await puppeteer.connect(puppeterData);
    const rentalsca = new Rentalsca();
    console.log("Getting URLs from sitemap...");
    return await rentalsca.getSitemapURLs(sitemap, {
      browser: browser,
    });
  } finally {
    await browser?.close();
  }
};

export const getURLsFromSitemaps = async (
  data: Data
): Promise<ListingsURLs> => {
  const MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME =
    process.env.MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME;
  if (!MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME) {
    throw new Error(
      "Environment variable 'MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME' is not defined"
    );
  }
  let listingsURLs: ListingsURLs = [];
  if (
    !(
      typeof data?.ecs?.cluster?.ARN === "string" &&
      typeof data?.ecs?.cluster?.region === "string" &&
      Array.isArray(data?.ecs?.task?.subnets) &&
      Array.isArray(data?.ecs?.task?.securityGroups) &&
      typeof data?.ecs?.task?.definition === "string" &&
      Array.isArray(data?.cities) &&
      typeof data.browser?.totalConcurrent === "number"
    )
  ) {
    throw new Error("Data key/value pairs are either not defined or correct");
  }
  if (!MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME) {
    throw new Error(
      "Please define the COLLECTION environment variable inside .env"
    );
  }
  const cluster = new Cluster(data.ecs.cluster.ARN, data.ecs.cluster.region);
  const task = cluster.createTask(
    data.ecs.task.subnets,
    data.ecs.task.securityGroups,
    data.ecs.task.definition
  );
  let client: MongoClient | null = null;
  const password = process.env.REDIS_RATEDRENTALS_CITIES_CACHE_PASSWORD;
  const host = process.env.REDIS_RATEDRENTALS_CITIES_CACHE_HOST;
  let port: string | number | undefined =
    process.env.REDIS_RATEDRENTALS_CITIES_CACHE_PORT;
  if (!(port && !isNaN(Number(port)))) {
    throw new Error(
      "Either REDIS_RATEDRENTALS_CITIES_CACHE_PORT is not defined in .env or is not a number (as a string)"
    );
  }
  port = parseInt(port);
  if (!(password && host)) {
    throw new Error(
      "Either REDIS_RATEDRENTALS_CITIES_CACHE_PASSWORD, REDIS_RATEDRENTALS_CITIES_CACHE_HOST, or REDIS_RATEDRENTALS_CITIES_CACHE_PORT not defined environment variables in .env"
    );
  }
  const cacheData = {
    password: password,
    socket: {
      tls: true,
      host: host,
      port: port,
    },
  };
  const cache = await connectToRedisDatabase(cacheData);
  try {
    console.log("Waiting for ECS task...");
    await task.wait();
    const browserWSEndpointURL = `ws://${task.getPublicIP()}:3000${
      typeof data.browser.WSEndpointURLQueryParams === "string"
        ? `?${data.browser.WSEndpointURLQueryParams}`
        : ""
    }`;
    console.log("Browser WS Endpoint URL", browserWSEndpointURL);
    const sitemaps: string[] = [];
    const citiesNames: string[] = [];
    data.cities.forEach((city) => {
      const name = city.name;
      if (typeof name === "string") {
        citiesNames.push(name);
      }
    });
    const availableCities: any[] = await getCities(cache);

    citiesNames.forEach((cityName) => {
      if (!isCity(cityName, availableCities)) {
        throw new Error(`City: ${cityName} not found.`);
      }
    });

    citiesNames.forEach((cityName) => {
      sitemaps.push(
        availableCities.find(
          (availableCity) =>
            availableCity.name === capitalizeFirstLetter(cityName)
        )?.["rentalsca"]?.["sitemap"]
      );
    });

    console.log("Sitemaps", sitemaps);

    const listingsURLsFromSitemaps: string[] = [];
    const sitemapJobs: Promise<void>[] = [];
    sitemaps.forEach((sitemap) => {
      sitemapJobs.push(
        getSitemapURLsJob(sitemap, {
          browserWSEndpoint: browserWSEndpointURL,
        }).then((URLs) => {
          URLs.forEach((URL) => {
            listingsURLsFromSitemaps.push(URL);
          });
        })
      );
    });
    await Promise.all(sitemapJobs);
    const connect = await connectToDatabase();
    client = connect.client;
    const db = connect.db;
    const collection = db.collection(
      MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME
    );
    console.log("Cities", citiesNames);
    const listingsURLsFromDatabase: string[] = (
      await collection
        .aggregate([
          {
            $match: {
              "city.name": {
                $in: citiesNames.map((cityName) =>
                  capitalizeFirstLetter(cityName)
                ),
              },
            },
          },
          { $group: { _id: null, urls: { $push: "$url" } } },
          { $project: { urls: true, _id: false } },
        ])
        .toArray()
    )[0].urls;
    listingsURLs = listingsURLsFromSitemaps.filter(
      (url) => !listingsURLsFromDatabase.includes(url)
    );
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Closing client...");
    await client?.close();
    console.log("Stopping ECS task...");
    await task.stop("Error or finished getting sitemap URLs");
    console.log("Closing cache...");
    await cache.quit();
  }
  return listingsURLs;
};
