import { formatListing } from '@/utils/listing'
import { getListingByListingId } from '@/utils/listing'
import { NextApiHandler, NextApiRequest } from 'next/types'

const isValidReqQuery = (
  query: NextApiRequest['query']
): query is {
  id: string
} => {
  return typeof query['id'] === 'string'
}

const apiHandler: NextApiHandler = async (req, res) => {
  try {
    if (!isValidReqQuery(req.query)) {
      return res.status(400).send({ error: 'Not valid query' })
    }
    let listingFromDatabase = await getListingByListingId(req.query.id, true)
    let isAvailable = false
    if (!listingFromDatabase) {
      listingFromDatabase = await getListingByListingId(req.query.id, false)
      if (!listingFromDatabase) {
        throw new Error('Could not get listing from id')
      }
    } else {
      isAvailable = true
    }
    const listing = formatListing(listingFromDatabase)

    return res.status(200).send({
      listing,
      isAvailable
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.message === 'Could not get listing from id') {
      return res.status(500).send({ error: `Could not find listing with id ${req.query.id}` })
    } else {
      return res.status(500).send({})
    }
  }
}

export default apiHandler
