export const getForYouListingUrl = ({ id }: { id: string }) => {
  return `/for-you/${id}`
}
import {
  Listing,
  RentalPreferences,
  SlugRentalPreferences,
} from 'ratedrentals-types'
import cookie from 'cookie'

export const getAddressURL = ({
  city,
  address,
  id
}: {
  address: string
  city: string
  id: string
}) => {
  return `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/${city}/${address}?id=${id}`
}

import { AvailableCities } from 'ratedrentals-types'
import { convertToSlugRentalPreferences } from './rentalPreferences'

export const getCityUrl = ({
  city,
  page,
}: {
  city: AvailableCities
  page: number
}) => {
  return `/${city.name.value}?page=${page}`
}

export const getIndexURL = ({ page }: { page: number }) => {
  return `/?page=${page}`
}

export const getListingsURL = ({
  city,
  rentalPreferences,
  page,
}: {
  city: AvailableCities
  rentalPreferences?: RentalPreferences
  page?: number
}) => {
  let slugRentalPreferences: SlugRentalPreferences | null = null
  if (rentalPreferences) {
    slugRentalPreferences = convertToSlugRentalPreferences(rentalPreferences)
  }
  const queryParamsString = slugRentalPreferences
    ? new URLSearchParams(
        JSON.parse(JSON.stringify({ page: page, ...slugRentalPreferences }))
      ).toString()
    : null
  const url = `/${city.name.value}${
    queryParamsString ? `?${queryParamsString}` : ''
  }`
  return url
}

export const getMatchesURL = ({
  city,
  rentalPreferences,
}: {
  city: AvailableCities
  rentalPreferences?: RentalPreferences
}) => {
  let slugRentalPreferences: SlugRentalPreferences | null = null
  if (rentalPreferences) {
    slugRentalPreferences = convertToSlugRentalPreferences(rentalPreferences)
  }
  const queryParamsString = new URLSearchParams(
    JSON.parse(
      JSON.stringify({ city: city.name.value, ...slugRentalPreferences })
    )
  ).toString()
  const url = `/for-you${queryParamsString ? `?${queryParamsString}` : ''}`
  return url
}

export const getPreferencesUrl = ({ city }: { city: AvailableCities }) => {
  return `preferences?city=${city.name.value}`
}
