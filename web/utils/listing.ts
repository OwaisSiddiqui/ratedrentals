import { AvailableCities, UnavailableCities } from 'ratedrentals-types'
import { ObjectId } from 'mongodb'
import { Listing } from 'ratedrentals-types'
import dayjs from 'dayjs'
import { isNumeric } from '@/utils/miscellaneous'
import { dateDifferenceInDays } from '@/utils/miscellaneous'
import { RankedListing, SlugRentalPreferences } from 'ratedrentals-types'
import { getRedisRankedListingsCacheClient } from '@/utils/cache'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import { ddbDocClient } from "./database/dynamodb"
import { GetCommand } from "@aws-sdk/lib-dynamodb"

const DYNAMODB_RATEDRENTALS_RENTALSCA_LISTINGS_TABLE_NAME:
  | string
  | undefined =
  process.env.DYNAMODB_RATEDRENTALS_RENTALSCA_LISTINGS_TABLE_NAME
if (!DYNAMODB_RATEDRENTALS_RENTALSCA_LISTINGS_TABLE_NAME) {
  throw new Error(
    'Define DYNAMODB_RATEDRENTALS_RENTALSCA_LISTINGS_TABLE_NAME in .env.local'
  )
}

export const formatListing = (listing: any): Listing => {
  try {
    const url = listing.url
    if (!(typeof url === 'string')) {
      throw new Error('url is not defined')
    }

    const utilites: Listing['property']['legal']['utilities'] = []
    const features: Listing['property']['features'] = {
      unit: [],
      building: [],
    }
    const nearbyAmenities: Listing['property']['nearbyAmenities'] = []
    const qAndA: { question: string; answer: string }[] = JSON.parse(listing.array_q_and_a).map(
      (qAndA: any) => {
        return {
          question: qAndA.answer_label,
          answer: qAndA.answer,
        }
      }
    )
    JSON.parse(listing.array_amenities).forEach((amenity: any) => {
      const amenityName = amenity.name

      if (typeof amenityName === 'string') {
        switch (amenity.category.name) {
          case 'Utilities':
            utilites.push(amenityName)
            break
          case 'Building Features':
            features.building.push(amenityName)
            break
          case 'Unit Features':
            features.unit.push(amenityName)
            break
          case 'Nearby':
            nearbyAmenities.push(amenityName)
            break
        }
      }
    })
    const paths = new URL(listing.url).pathname.slice(1).split('/')
    const date = {
      created: dayjs(listing.created),
      updated: dayjs(listing.updated),
    }
    const photos: Listing['property']['photos'] = JSON.parse(listing.array_photos).map(
      (photo: any) => {
        const smallPhoto = {
          url: photo.scales.small.url,
          size: {
            width: photo.scales.small.width,
            height: photo.scales.small.height,
          },
        }
        const mediumPhoto = {
          url: photo.scales.medium.url,
          size: {
            width: photo.scales.medium.width,
            height: photo.scales.medium.height,
          },
        }
        const largePhoto = {
          url: photo.scales.large.url,
          size: {
            width: photo.scales.large.width,
            height: photo.scales.large.height,
          },
        }

        return {
          alt: photo.alt,
          scales: {
            small: {
              url: typeof smallPhoto.url === 'string' ? smallPhoto.url : null,
              size: {
                width: smallPhoto.size.width,
                height: smallPhoto.size.height,
              },
            },
            medium: {
              url: typeof mediumPhoto.url === 'string' ? mediumPhoto.url : null,
              size: {
                width: mediumPhoto.size.width,
                height: mediumPhoto.size.height,
              },
            },
            large: {
              url: typeof largePhoto.url === 'string' ? largePhoto.url : null,
              size: {
                width: largePhoto.size.width,
                height: largePhoto.size.height,
              },
            },
          },
        }
      }
    )
    const tours: Listing['property']['tours'] = []
    JSON.parse(listing.array_tours).map((tour: any) => {
      tours.push({
        id: tour.data.external_id,
        provider: tour.provider,
        name: tour.name,
      })
    })

    const rawListing = {
      promotions: JSON.parse(listing.array_promotions),
      date: {
        created: date.created.isValid()
          ? date.created.toDate().toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : null,
        updated: date.updated.isValid()
          ? date.updated.toDate().toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : null,
      },
      property: {
        tours: tours,
        features: {
          unit: features.unit,
          building: features.building,
        },
        housing: JSON.parse(listing.array_property_types)[1],
        legal: {
          lease: {
            term: listing.lease_term,
            short: listing.short_term,
          },
          rent: JSON.parse(listing.array_rent_range)[0],
          utilities: utilites,
        },
        location: {
          coordinates: {
            lat: listing['location.lat'],
            lng: listing['location.lng'],
          },
          address: {
            value: listing.address1,
            slug: paths[paths.length - 1],
          },
          region: {
            value: listing['city.region.name'],
            city: listing['city.name'],
            province: {
              value: listing['city.region.name'],
              code: listing['city.region.code'],
            },
            postalCode: listing.postal_code,
          },
        },
        photos: photos,
        properties: {
          beds: JSON.parse(listing.array_beds_range)[0],
          baths: JSON.parse(listing.array_baths_range)[0],
          size: JSON.parse(listing.array_dimensions_range)[0],
          type: listing.property_type,
          petFriendly: listing.pet_friendly,
          furnished: listing.furnished,
          parkingType: null,
        },
        nearbyAmenities: nearbyAmenities,
      },
      poster: {
        email: listing['contact.email'],
        phone: listing['contact.phone'],
        name: listing['contact.name'],
      },
      description: listing.description,
    }

    const result: Listing = {
      _id: listing.oid__id,
      meta: {
        daysAgo: Math.floor(
          dateDifferenceInDays(
            rawListing.date.updated ?? '',
            new Date().toString()
          )
        ),
      },
      promotions: rawListing.promotions,
      date: {
        created: rawListing.date.created,
        updated: rawListing.date.updated,
      },
      url: url,
      property: {
        tours: rawListing.property.tours,
        features: {
          unit: rawListing.property.features.unit,
          building: rawListing.property.features.building,
        },
        housing:
          typeof rawListing.property.housing === 'string'
            ? rawListing.property.housing
            : null,
        legal: {
          lease: {
            term:
              typeof rawListing.property.legal.lease.term === 'string'
                ? rawListing.property.legal.lease.term
                : null,
            short:
              typeof rawListing.property.legal.lease.short === 'boolean'
                ? rawListing.property.legal.lease.short
                : null,
          },
          rent: isNumeric(rawListing.property.legal.rent)
            ? Number(rawListing.property.legal.rent)
            : null,
          utilities: rawListing.property.legal.utilities,
        },
        location: {
          coordinates: {
            lat: isNumeric(rawListing.property.location.coordinates.lat)
              ? Number(rawListing.property.location.coordinates.lat)
              : null,
            lng: isNumeric(listing['location.lng'])
              ? Number(rawListing.property.location.coordinates.lng)
              : null,
          },
          address: {
            value:
              typeof rawListing.property.location.address.value === 'string'
                ? rawListing.property.location.address.value
                : null,
            slug: rawListing.property.location.address.slug,
          },
          region: {
            value:
              typeof rawListing.property.location.region.value === 'string'
                ? rawListing.property.location.region.value
                : null,
            city:
              typeof rawListing.property.location.region.city === 'string'
                ? rawListing.property.location.region.city
                : null,
            province: {
              code:
                typeof rawListing.property.location.region.province.code ===
                'string'
                  ? rawListing.property.location.region.province.code
                  : null,
              value:
                typeof rawListing.property.location.region.province.value ===
                'string'
                  ? rawListing.property.location.region.province.value
                  : null,
            },
            postalCode:
              typeof rawListing.property.location.region.postalCode === 'string'
                ? rawListing.property.location.region.postalCode
                : null,
          },
        },
        nearbyAmenities: rawListing.property.nearbyAmenities,
        photos: rawListing.property.photos,
        properties: {
          beds:
            typeof rawListing.property.properties.beds === 'number'
              ? rawListing.property.properties.beds
              : null,
          baths:
            typeof rawListing.property.properties.baths === 'number'
              ? rawListing.property.properties.baths
              : null,
          size:
            typeof rawListing.property.properties.size === 'number' &&
            rawListing.property.properties.size !== 0
              ? rawListing.property.properties.size
              : null,
          type:
            typeof rawListing.property.properties.type === 'string'
              ? rawListing.property.properties.type
              : null,
          petFriendly:
            typeof rawListing.property.properties.petFriendly === 'boolean'
              ? rawListing.property.properties.petFriendly
              : null,
          furnished:
            typeof rawListing.property.properties.furnished === 'boolean'
              ? rawListing.property.properties.furnished
              : null,
          parkingType:
            qAndA.find(qAndA => qAndA.question === 'Parking Type')?.answer ??
            null,
        },
      },
      poster: {
        email:
          typeof rawListing.poster.email === 'string'
            ? rawListing.poster.email
            : null,
        phone:
          typeof rawListing.poster.phone === 'string'
            ? rawListing.poster.phone
            : null,
        name:
          typeof rawListing.poster.name === 'string'
            ? rawListing.poster.name
            : null,
      },
      description:
        typeof rawListing.description === 'string'
          ? rawListing.description
          : null,
    }

    return result
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

const PROJECTION = {
  _id: 1,
  photos: 1,
  created: 1,
  updated: 1,
  property_type: 1,
  beds_range: 1,
  baths_range: 1,
  dimensions_range: 1,
  rent_range: 1,
  parent_place: 1,
  city: 1,
  postal_code: 1,
  address1: 1,
  location: 1,
  url: 1,
  contact: 1,
  description: 1,
  amenities: 1,
  property_types: 1,
  q_and_a: 1,
  pet_friendly: 1,
  furnished: 1,
  categories: 1,
  lease_term: 1,
  short_term: 1,
  tours: 1,
  promotions: 1,
}

// export const getListingByCityAndAddress = async (
//   city: AvailableCities['name']['dbName'] | UnavailableCities['name']['dbName'],
//   address: string,
//   isAvailable: boolean
// ) => {
//   const { db } = await connectToMongoDbDatabase()
//   const listing = await db
//     .collection('rentalsca-listings')
//     .find(
//       {
//         'city.slug': city,
//         address1: address,
//         'is-available': isAvailable,
//       },
//       {
//         projection: PROJECTION,
//       }
//     )
//     .toArray()
//   return listing[0]
// }

export const getListingByListingId = async (id: string, isAvailable: boolean) => {
  const data = await ddbDocClient.send(new GetCommand({
    TableName: DYNAMODB_RATEDRENTALS_RENTALSCA_LISTINGS_TABLE_NAME,
    Key: {
      oid__id: id
    }
  }))
  return data.Item
}

const LAMBDA_RANKING_FUNCTION_NAME = process.env.LAMBDA_RANKING_FUNCTION_NAME
if (!LAMBDA_RANKING_FUNCTION_NAME) {
  throw new Error(
    'Environment variable LAMBDA_RANKING_FUNCTION_NAME is not defined'
  )
}

export const getRankedListingsIDs = async (
  city: AvailableCities['name']['dbName'],
  slugRentalPreferences: SlugRentalPreferences
) => {
  const keyObj = { ...slugRentalPreferences, city: city }
  let listingsIDs: RankedListing[] = []
  const client = await getRedisRankedListingsCacheClient()
  const key = JSON.stringify(keyObj)
  let isInCache = false
  await client.exists(key).then(reply => {
    if (reply !== 0) {
      isInCache = true
    }
  })
  if (!isInCache) {
    const lambdaCient = new LambdaClient({
      region: 'us-east-2',
    })
    const invokeCommand = new InvokeCommand({
      FunctionName: LAMBDA_RANKING_FUNCTION_NAME,
      Payload: new TextEncoder().encode(
        JSON.stringify({
          rentalPreferences: keyObj,
        })
      ),
    })
    const lambdaResponse = await lambdaCient.send(invokeCommand)
    if (lambdaResponse.Payload) {
      const payload = JSON.parse(
        new TextDecoder().decode(lambdaResponse.Payload)
      )
      if ('errorMessage' in payload) {
        throw new Error(
          `Error in getting ranked listings: ${payload.errorMessage}`
        )
      } else {
        listingsIDs = payload
      }
      client.set(key, JSON.stringify(listingsIDs))
    } else {
      throw new Error('Lambda response does not exist.')
    }
  } else {
    const result = await client.get(key)
    if (result) {
      listingsIDs = JSON.parse(result)
    } else {
      throw new Error('Could not get listing IDs from cache')
    }
  }
  return listingsIDs
}
