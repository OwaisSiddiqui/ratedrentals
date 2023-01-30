import "dotenv/config";
import { Data, ListingsURLs } from "rentalsca";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "./utils/mongodb";
import { Cluster } from "ecs-helper";
import { Collection } from "mongodb";
import { BrowserProcessor } from "./shared";
import { getURLsFromSitemaps } from "./sitemapURLs";
import { getAvailableURLsFromDatabase } from "./availableURLsDatabase";

const MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME =
  process.env.MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME;
const LISTINGS_URLS_PER_TASK = 500;

const job = async (
  listingsURLs: ListingsURLs,
  cluster: Cluster,
  taskInfo: { subnets: string[]; securityGroups: string[]; definition: string },
  browser: { WSEndpointURLQueryParams: unknown; totalConcurrent: number },
  collection: Collection
) => {
  const task = cluster.createTask(
    taskInfo.subnets,
    taskInfo.securityGroups,
    taskInfo.definition
  );
  try {
    console.log("Waiting for ECS task...");
    await task.wait();
    const browserWSEndpointURL = `ws://${task.getPublicIP()}:3000${
      typeof browser.WSEndpointURLQueryParams === "string"
        ? `?${browser.WSEndpointURLQueryParams}`
        : ""
    }`;
    for (let i = 0; i < listingsURLs.length; i += browser.totalConcurrent) {
      const browserProcessors: Promise<void>[] = [];
      for (
        let j = i;
        j < Math.min(i + browser.totalConcurrent, listingsURLs.length);
        j++
      ) {
        const browserProcessor = new BrowserProcessor({
          id: j,
          puppeteerData: {
            browserWSEndpoint: browserWSEndpointURL,
          },
          collection: collection,
          listingURL: listingsURLs[j],
        });
        browserProcessors.push(browserProcessor.start());
      }
      await Promise.all(browserProcessors);
    }
  } catch (error) {
    console.log("❌ Error while completing job:", error)
    throw error
  } finally {
    console.log("Closing task...");
    await task.stop("Error or done job.");
  }
};

const main = async (data: Data) => {
  if (
    !(
      typeof data?.ecs?.cluster?.ARN === "string" &&
      typeof data?.ecs?.cluster?.region === "string" &&
      Array.isArray(data?.ecs?.task?.subnets) &&
      Array.isArray(data?.ecs?.task?.securityGroups) &&
      typeof data?.ecs?.task?.definition === "string" &&
      typeof data?.browser?.totalConcurrent === "number"
    )
  ) {
    throw new Error("Data key/value pairs are either not defined or correct");
  }
  if (!MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME) {
    throw new Error(
      "Please define the MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME environment variable inside .env"
    );
  }
  let client: MongoClient | null = null;
  try {
    const cluster = new Cluster(data.ecs.cluster.ARN, data.ecs.cluster.region);
    const connect = await connectToDatabase();
    client = connect.client;
    const db = connect.db;
    const collection = db.collection(
      MONGODB_RATEDRENTALS_RENTALSCA_COLLECTION_NAME
    );
    const availableURLsFromDatabase = await getAvailableURLsFromDatabase();
    const URLsFromSitemaps = await getURLsFromSitemaps(data);
    const listingsURLs: ListingsURLs =
      availableURLsFromDatabase.concat(URLsFromSitemaps);
    console.log(`${listingsURLs.length} listings URLs`);
    const jobs: Promise<void>[] = [];
    for (let i = 0; i < listingsURLs.length; i += LISTINGS_URLS_PER_TASK) {
      jobs.push(
        job(
          listingsURLs.slice(i, i + LISTINGS_URLS_PER_TASK),
          cluster,
          {
            subnets: data.ecs.task.subnets,
            securityGroups: data.ecs.task.securityGroups,
            definition: data.ecs.task.definition,
          },
          {
            WSEndpointURLQueryParams: data.browser.WSEndpointURLQueryParams,
            totalConcurrent: data.browser.totalConcurrent,
          },
          collection
        )
      );
    }
    await Promise.allSettled(jobs);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Closing client...");
    await client?.close();
  }
};

export default main;
