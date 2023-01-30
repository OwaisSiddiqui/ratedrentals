import Match from '@/components/for-you/Match'
import Slide from '@/components/for-you/Slide'
import { formatListing } from '@/utils/listing'
import { getListingByListingId } from '@/utils/listing'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import { AvailableCities, Listing, RankedListing } from 'ratedrentals-types'
import Head from 'next/head'
import { COMPANY_NAME } from '@/utils/constants'
import { SavedListingsProvider } from '@/contexts/savedListingsContext'
import LookingFor from '@/components/for-you/Slide/InfoSlide/LookingForSlide'
import Slider from '@/components/for-you/Slider'
import { ViewedListingsProvider } from '@/contexts/viewedListingsContext'
import cookie from 'cookie'
import { getCity } from '@/utils/city'
import { isAvailableCity } from '@/utils/city'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCity } from '@/redux/slices/citySlice'
import Matches, { NavigateListings } from '@/components/for-you/Matches'
import { isTouchDevice as isTouchDeviceFunc } from '@/utils/miscellaneous'
import * as S from '@/components/[city]/[address]/pages.styles'
import Chevron from '@/components/global/icons/Chevron'

const Address = ({
  listing,
  city,
  isAvailable
}: {
  listing: Listing
  city: AvailableCities
  isAvailable: boolean
}) => {
  const dispatch = useDispatch()
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isViewMoreDetails, setIsViewMoreDetails] = useState(false)

  useEffect(() => {
    setIsTouchDevice(isTouchDeviceFunc())
  }, [])

  useEffect(() => {
    dispatch(setCity(city))
  }, [city, dispatch])

  const navigateListingsComponent = <NavigateListings currentIndex={slideIndex} maxIndex={1} onClick={{
    prev: () => {
      setSlideIndex(prev => prev - 1)
    },
    next: () => {
      setSlideIndex(prev => prev + 1)
    }
  }}  />

  return (
    <>
      <Head>
        <title>{`${listing.property.location.address.value}, ${listing.property.location.region.city}, ${listing.property.location.region.province.code} - For Rent - ${COMPANY_NAME}`}</title>
      </Head>
      <SavedListingsProvider>
        <ViewedListingsProvider>
          <Slider>
            {typeof isTouchDevice === 'boolean' ? isTouchDevice ? (
              <Slide
                right={undefined}
                left={undefined}
                isTouchDevice={isTouchDevice} navigateListingsComponent={null}              >
                <Match
                  isViewMoreDetailsState={{
                    setValue: setIsViewMoreDetails,
                    value: isViewMoreDetails
                  }}
                  isAvailable={isAvailable}
                  isForYouIdPage={true}
                  isSlide={true}
                  listingData={{ listing: listing }}
                  isTouchDevice={isTouchDevice}
                  navigateListingsComponent={null}
                />
              </Slide>
            ) : (
              <>
                {slideIndex !== 0 && <LookingFor navigateListingsComponent={navigateListingsComponent} isTouchDevice={isTouchDevice} />}
                {slideIndex === 0 && <Match
                  isViewMoreDetailsState={{
                    setValue: setIsViewMoreDetails,
                    value: isViewMoreDetails
                  }}
                  isAvailable={isAvailable}
                  navigateListingsComponent={navigateListingsComponent}
                  isForYouIdPage={true}
                  isSlide={true}
                  listingData={{ listing: listing }}
                  isTouchDevice={isTouchDevice}
                />}
              </>
            ) : null}
          </Slider>
        </ViewedListingsProvider>
      </SavedListingsProvider>
    </>
  )
}

const isValidQuery = (
  query: ParsedUrlQuery
): query is {
  city: string
  address: string
  id: string
} => {
  return (
    query && typeof query.city === 'string' && typeof query.address === 'string' && typeof query.id === 'string'
  )
}

export const getServerSideProps = async ({
  query,
  params,
}: GetServerSidePropsContext) => {
  try {
    if (!isValidQuery(query)) {
      throw new Error('Query is not valid')
    }
    const cityName: string = query.city
    const address: string = query.address
    const id: string = query.id
    if (!isAvailableCity(cityName, true)) {
      throw new Error('City not in available cities.')
    }
    const city = getCity(cityName)
    let listingFromDatabase = await getListingByListingId(
      id,
      true
    )
    let isAvailable = false
    if (!listingFromDatabase) {
      listingFromDatabase = await getListingByListingId(
        id,
        false
      )
      if (!listingFromDatabase) {
        throw new Error('Could not get listing from city and address')
      }
    } else {
      isAvailable = true
    }
    const listing = formatListing(listingFromDatabase)
    return {
      props: {
        listing,
        city,
        isAvailable
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default Address
