import { GetServerSidePropsContext } from 'next'
import {
  AvailableCities,
  Listing,
  Match,
  RankedListing,
  RentalPreferences,
  SlugRentalPreferences,
} from 'ratedrentals-types'
import { getCity } from '@/utils/city'
import { isAvailableCity } from '@/utils/city'
import Head from 'next/head'
import { COMPANY_NAME } from '@/utils/constants'
import { getRankedListingsIDs } from '@/utils/listing'
import { getSlugRentalPreferences } from '@/utils/rentalPreferences'
import { ParsedUrlQuery } from 'querystring'
import * as S from '@/components/for-you/page.styles'
import ListingViewer from '@/components/for-you/Listing'
import { getMatchesURL } from '@/utils/url'
import { convertToRentalPreferences } from '@/utils/rentalPreferences'
import rentalPreferencesSlice, {
  setBathrooms,
  setBedrooms,
  setHome,
  setPriority,
  setRent,
  setSize,
} from '@/redux/slices/rentalPreferencesSlice'
import Matches from '@/components/for-you/Matches'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { setCity } from '@/redux/slices/citySlice'
import cookie from 'cookie'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { ViewedListingsProvider } from '@/contexts/viewedListingsContext'

const ForYou = ({
  city,
  rentalPreferences,
  rankedListings,
  isReturningUser,
}: {
  city: AvailableCities
  rentalPreferences: RentalPreferences
  rankedListings: RankedListing[]
  isReturningUser: boolean
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setBedrooms(rentalPreferences['bedrooms'].value))
    dispatch(setBathrooms(rentalPreferences['bathrooms'].value))
    dispatch(setHome(rentalPreferences['home'].value))
    dispatch(
      setSize({
        value: rentalPreferences['size']['value'],
        selection: rentalPreferences['size']['selection'],
      })
    )
    dispatch(
      setRent({
        value: rentalPreferences['rent'].value,
        selection: rentalPreferences['rent']['selection'],
      })
    )
    dispatch(
      setPriority({
        category: 'beds',
        value: rentalPreferences['priority']['categories']['beds']['value'],
      })
    )
    dispatch(
      setPriority({
        category: 'baths',
        value: rentalPreferences['priority']['categories']['baths']['value'],
      })
    )
    dispatch(
      setPriority({
        category: 'home',
        value: rentalPreferences['priority']['categories']['home']['value'],
      })
    )
    dispatch(
      setPriority({
        category: 'size',
        value: rentalPreferences['priority']['categories']['size']['value'],
      })
    )
    dispatch(
      setPriority({
        category: 'rent',
        value: rentalPreferences['priority']['categories']['rent']['value'],
      })
    )
  }, [dispatch, rentalPreferences])

  useEffect(() => {
    dispatch(setCity(city))
  }, [dispatch, city])

  return (
    <>
      <Head>
        <title>{`For You - ${COMPANY_NAME}`}</title>
      </Head>
      <ViewedListingsProvider>
        <Matches
          isReturningUser={isReturningUser}
          rankedListings={rankedListings}
        />
      </ViewedListingsProvider>
    </>
  )
}

const isValidQuery = (
  query: ParsedUrlQuery
): query is {
  city: string
} => {
  return query && typeof query.city === 'string'
}

export const getServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext) => {
  try {
    let city: AvailableCities | null = null
    let queryObj: any = null
    let isReturningUser = false
    if (!isValidQuery(query)) {
      const cookies = cookie.parse(req.headers.cookie || '')
      if (cookies['city'] && cookies['rentalPreferences']) {
        queryObj = JSON.parse(cookies['rentalPreferences'])
        const cityName: string = cookies['city']
        if (!isAvailableCity(cityName)) {
          throw new Error('City not in available cities.')
        }
        city = getCity(cityName) as AvailableCities
        isReturningUser = true
      } else {
        return {
          redirect: {
            destination: '/',
            permenant: false,
          },
        }
      }
    } else {
      queryObj = query
      const cityName: string = query.city
      if (!isAvailableCity(cityName)) {
        throw new Error('City not in available cities.')
      }
      city = getCity(cityName) as AvailableCities
    }

    const slugRentalPreferences:
      | SlugRentalPreferences
      | GetServerSidePropsContext['query'] = getSlugRentalPreferences(queryObj)
    const rankedListings = await getRankedListingsIDs(
      city.name.dbName,
      slugRentalPreferences
    )
    const rentalPreferences = convertToRentalPreferences(slugRentalPreferences)

    return {
      props: {
        city,
        rentalPreferences,
        rankedListings,
        isReturningUser,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default ForYou
