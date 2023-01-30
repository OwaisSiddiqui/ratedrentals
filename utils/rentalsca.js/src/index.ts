import { Browser, Page } from "puppeteer-core";
import { parseString } from "xml2js";

const DEFAULT_BROWSER_OPTIONS: BrowserInput["options"] = {
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36",
};

export interface BrowserInput {
  browser: Browser;
  options?: {
    userAgent: string;
  };
}

export interface GetListingReturn {
  error: {
    isError: boolean;
    error?: Error;
  };
  listing?: {
    isAvailable: boolean;
    listing?: Record<string, unknown>;
    reason?: Error;
  };
}
export class Rentalsca {
  getListing = async (
    URL: string,
    browser: BrowserInput
  ): Promise<GetListingReturn> => {
    let page: Page | null = null;
    try {
      page = await browser.browser.newPage();
      const browserOptions: BrowserInput["options"] =
        browser.options ?? DEFAULT_BROWSER_OPTIONS;
      await page.setUserAgent(browserOptions.userAgent);
      await page.setJavaScriptEnabled(true);
      page.setDefaultNavigationTimeout(0);
      await page.goto(URL);
    } catch (error) {
      return {
        error: {
          isError: true,
          error: error,
        },
      };
    }
    let listing: GetListingReturn["listing"]["listing"];
    try {
      listing = (await page.evaluate("App.store.listing")) as Record<
        string,
        unknown
      >;
      if (!listing) {
        return {
          error: {
            isError: false,
          },
          listing: {
            isAvailable: false,
            reason: new Error("Listing is not defined"),
          },
        };
      }
    } catch (error) {
      return {
        error: {
          isError: true,
          error: error,
        },
      };
    }
    return {
      error: {
        isError: false,
      },
      listing: {
        isAvailable: true,
        listing: listing,
      },
    };
  };

  private getSitemapXML = async (sitemap: string, browser: BrowserInput) => {
    const page = await browser.browser.newPage();
    page.setDefaultNavigationTimeout(0);
    const browserOptions: BrowserInput["options"] =
      browser.options ?? DEFAULT_BROWSER_OPTIONS;
    await page.setUserAgent(browserOptions.userAgent);
    await page.goto(sitemap);
    const data = (await page.evaluate(
      'document.getElementById("webkit-xml-viewer-source-xml").getInnerHTML()'
    )) as string;
    return data;
  };

  getSitemapURLs = async (sitemap: string, browser: BrowserInput) => {
    const sitemapXML = await this.getSitemapXML(sitemap, browser);
    let json: any = {};
    parseString(sitemapXML, (error, result) => {
      if (error) throw error;
      json = result;
    });
    const URLs: string[] = [];
    json.urlset.url.forEach((listingObject: any) => {
      if (listingObject.loc && listingObject.priority) {
        const URL = listingObject.loc[0];
        if (
          listingObject.priority[0] == "0.6" &&
          !URLs.includes(URL) &&
          !URL.includes("manage/preview") &&
          !URL.includes("https://rentals.ca/fr/") &&
          URL.split("/").length - 1 === 4
        ) {
          URLs.push(URL);
        }
      }
    });
    return URLs;
  };
}
