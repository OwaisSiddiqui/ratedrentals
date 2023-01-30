import { getCity } from '@/utils/city'
import { isAvailableCity } from '@/utils/city'
import { formatListing } from '@/utils/listing'
import { getListingByListingId } from '@/utils/listing'
import { getRankedListingsIDs } from '@/utils/listing'
import { getSlugRentalPreferences } from '@/utils/rentalPreferences'
import { GetServerSidePropsContext, NextApiHandler } from 'next/types'
import {
  AvailableCities,
  Listing,
  Pages,
  SlugRentalPreferences,
} from 'ratedrentals-types'

const NUMBER_OF_LISTINGS_PER_PAGE = 10

const isValidReqBody = (
  reqBody: any
): reqBody is {
  city: string
  page: string
  rentalPreferences: any
} => {
  return (
    reqBody &&
    typeof reqBody['page'] === 'string' &&
    typeof reqBody['city'] === 'string'
  )
}

const getPage = (string: string) => {
  if (!isNaN(Number(string))) {
    return parseInt(string)
  }
  return 1
}

const apiHandler: NextApiHandler = async (req, res) => {
  try {
    const reqBody = req.body
    if (!isValidReqBody(reqBody)) {
      throw new Error('Body is not valid')
    }
    const cityName: string = reqBody.city
    if (!isAvailableCity(cityName)) {
      throw new Error('City not in available cities.')
    }
    const page = getPage(reqBody['page'])
    const city = getCity(cityName) as AvailableCities
    const slugRentalPreferences:
      | SlugRentalPreferences
      | GetServerSidePropsContext['query'] = getSlugRentalPreferences(
      reqBody['rentalPreferences']
    )
    const rankedListings = await getRankedListingsIDs(
      city.name.dbName,
      slugRentalPreferences
    )
    const listings: Listing[] = []

    for (
      let i = (page - 1) * NUMBER_OF_LISTINGS_PER_PAGE;
      i <
      Math.min(
        (page - 1) * NUMBER_OF_LISTINGS_PER_PAGE + NUMBER_OF_LISTINGS_PER_PAGE,
        rankedListings.length
      );
      i += 1
    ) {
      listings.push(
        formatListing(await getListingByListingId(rankedListings[i]['_id'], true))
      )
    }

    const totalListings = rankedListings.length
    const pages: Pages = {
      totalPages: Math.floor(totalListings / NUMBER_OF_LISTINGS_PER_PAGE) + 1,
      listingsPerPage: NUMBER_OF_LISTINGS_PER_PAGE,
      neighbours: 1,
      totalListings: totalListings,
      maxPages: 5,
    }

    return res.status(200).send({
      pages: pages,
      listings: listings,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error })
  }
}

export default apiHandler
