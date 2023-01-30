import { Collection, UpdateResult, Document } from "mongodb";
import { Browser } from "puppeteer-core";
import { Rentalsca, GetListingReturn } from "rentalsca.js";
import puppeteer from "puppeteer-core";
import { ListingsURLs } from "rentalsca";

interface BrowserProcessorParameters {
  id: number;
  puppeteerData: puppeteer.ConnectOptions;
  collection: Collection;
  listingURL: ListingsURLs[number];
}

export class BrowserProcessor {
  id: number;
  puppeteerData: puppeteer.ConnectOptions;
  collection: Collection;
  listingURL: ListingsURLs[number];

  constructor({
    id,
    puppeteerData,
    collection,
    listingURL,
  }: BrowserProcessorParameters) {
    this.id = id;
    this.puppeteerData = puppeteerData;
    this.collection = collection;
    this.listingURL = listingURL;
  }

  async handleResult(
    result: GetListingReturn["listing"]
  ): Promise<Document | UpdateResult> {
    if (result?.isAvailable && result.listing) {
      const isListingAlreadyInDatabase = await this.collection.findOne({
        url: this.listingURL,
      });
      console.log(`New listing / listing URL ${this.listingURL} is available.`);
      if (isListingAlreadyInDatabase) {
        return this.collection.replaceOne(
          { url: this.listingURL },
          { ...result.listing, "is-available": true }
        );
      } else {
        return this.collection.insertOne({
          ...result.listing,
          "is-available": true,
        });
      }
    } else {
      console.log(`🟨 Listing URL ${this.listingURL} is not available. Reason:`, result?.reason);
      return this.collection.updateOne(
        { url: this.listingURL },
        { $set: { "is-available": false } }
      );
    }
  }

  start = async () => {
    const listingURL = this.listingURL;
    console.log(`${this.id}: ${listingURL}`);
    await this.scrapeListing(listingURL, this.puppeteerData)
      .then((result) => {
        if (!result.error.isError) {
          return this.handleResult(result.listing);
        } else {
          throw result.error.error;
        }
      })
      .then((result) => {
        if (result.acknowledged) {
          console.log(`✅ Updated`);
        } else {
          throw new Error("Could not update listing");
        }
      })
    console.log(`🏁 #${this.id} Finished browser process`);
  };

  scrapeListing = async (
    listing: string,
    puppeteerData: puppeteer.ConnectOptions
  ) => {
    let browser: Browser | null = null;
    try {
      browser = await puppeteer.connect(puppeteerData);
      const rentalsca = new Rentalsca();
      return await rentalsca.getListing(listing, {
        browser: browser,
      });
    } finally {
      browser?.close();
    }
  };
}
