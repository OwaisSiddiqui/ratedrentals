import fetch from "node-fetch"
import { JSDOM } from "jsdom";
import fs from "fs"
import puppeteer, { Browser, Puppeteer } from "puppeteer"

const KIJIJI_DOMAIN_URL = "https://www.kijiji.ca"
const TESTS_FOLDER_PATH = "tests"
const MINIMUM_KIJIJI_PAGE_NUMBER = 1
const MAXIMUM_KIJIJI_PAGE_NUMBER = 1

const addListing = (listing: any, adID: number) => {
    fs.writeFile(`${TESTS_FOLDER_PATH}/puppeteer-${adID}.json`, JSON.stringify(listing), (error) => {
        if (error) throw error
    })
}

const getKijijiLongTermRentalsOfferingPerPageOntarioURL = (pageNumber: number) => {
    if (pageNumber < 0 || pageNumber > 100) {
        throw new Error("Page number has to be between 1 and 100 (inclusive)")
    }
    return `https://www.kijiji.ca/b-apartments-condos/ontario/page-${pageNumber}/c37l9004?ad=offering`
}

const scrape = async (URL: string) => {
    let browser: Browser | null = null;
    try {
        browser = await puppeteer.launch({})
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0)
        await page.goto(URL)
        const data = await page.evaluate('window.__data')
        if (!data) {
            console.log("Check window.__data", data, `for URL: ${URL}`)
            throw new Error("window.__data is not defined. Value: " + data)
        }
        const adID = data.viewItemPage.viewItemData.adId
        if (typeof adID !== "number") {
            console.log("Check window.__data.viewItemPage.viewItemData.adId", adID, `for URL: ${URL}`)
            throw new Error("Ad ID is not a number. Value: " + adID)
        }
        addListing(data, adID)
    } catch (error) {
        throw error
    } finally {
        await browser?.close()
    }
}

const getListingURLs = async (URL: string) => {
    return fetch(URL)
        .then(response => response.text())
        .then(html => {
            const listingURLAttribute = 'data-vip-url'
            const { window } = new JSDOM(html)
            const { document } = window
            const URLs: string[] = []
            document.querySelectorAll(`[${listingURLAttribute}]`).forEach((element: any) => {
                URLs.push(KIJIJI_DOMAIN_URL + element.getAttribute(`${listingURLAttribute}`))
            })
            return URLs
        })
        .catch(error => {
            console.log(`Error while getting URLs for URL: ${URL}`)
            throw error
        })
}

(async () => {
    const listingURLs: string[] = [];
    const getURLsPromises: Promise<void>[] = []
    let numberOfSuccessfullyGetListingURLs = 0
    let numberOfFailedGetListingURLs = 0
    const reasonsForFailedGetListingURLs: { [key: string]: number } = {}

    for (let i = MINIMUM_KIJIJI_PAGE_NUMBER; i < MAXIMUM_KIJIJI_PAGE_NUMBER + 1; i++) {
        const kijijiLongTermRentalsOfferingPerPageOntarioURL = getKijijiLongTermRentalsOfferingPerPageOntarioURL(i)
        getURLsPromises.push(getListingURLs(kijijiLongTermRentalsOfferingPerPageOntarioURL)
            .then(result => {
                numberOfSuccessfullyGetListingURLs += 1
                result.forEach(URL => {
                    listingURLs.push(URL)
                })
            })
            .catch(error => {
                numberOfFailedGetListingURLs += 1
                if (!(error.message in reasonsForFailedGetListingURLs)) {
                    reasonsForFailedGetListingURLs[error.message] = 0
                }
                reasonsForFailedGetListingURLs[error.message] += 1
            })
        )
    }
    await Promise.allSettled(getURLsPromises)

    console.log(`Number of successfully get listing URLs: ${numberOfSuccessfullyGetListingURLs} | Number of failed get listing URLs: ${numberOfFailedGetListingURLs} | Total: ${numberOfSuccessfullyGetListingURLs + numberOfFailedGetListingURLs}`)
    console.log('Reasons for failed get listing URLs:', reasonsForFailedGetListingURLs)

    console.log(`Length of URLs: ${listingURLs.length}`)

    const scrapePromises: Promise<void>[] = []
    let numberOfSuccessfullyScraped = 0
    let numberOfFailedScraped = 0
    const reasonsForFailedScraped: { [key: string]: number } = {}

    for (let i = 0; i < 5; i++) {
        const URL = listingURLs[i]
        scrapePromises.push(scrape(URL).then(() => {
            numberOfSuccessfullyScraped += 1
        }).catch(error => {
            numberOfFailedScraped += 1
            if (!(error.message in reasonsForFailedScraped)) {
                reasonsForFailedScraped[error.message] = 0
            }
            reasonsForFailedScraped[error.message] += 1
        }))
    }

    await Promise.allSettled(scrapePromises)

    console.log(`Number of successfully scraped: ${numberOfSuccessfullyScraped} | Number of failed scraped: ${numberOfFailedScraped} | Total: ${numberOfSuccessfullyScraped + numberOfFailedScraped}`)
    console.log('Reasons for failed scraped:', reasonsForFailedScraped)
})()