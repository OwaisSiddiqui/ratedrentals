import { NextApiResponse } from 'next'
import { CookieSerializeOptions } from 'next/dist/server/web/types'
import cookie, { serialize } from 'cookie'
import { AvailableCities, RentalPreferences } from 'ratedrentals-types'
import { convertToSlugRentalPreferences } from '@/utils/rentalPreferences'

const MAX_COOKIE_EXPIRATION_TIME = 2147483647

export const setUserPreferencesCookie = ({
  city,
  rentalPreferences,
}: {
  city?: AvailableCities
  rentalPreferences?: RentalPreferences
}) => {
    if (city) {
      const cityCookie = cookie.serialize('city', city.name.value)
      document.cookie = `${cityCookie};max-age=${MAX_COOKIE_EXPIRATION_TIME}`
    }
    if (rentalPreferences) {
      const rentalPreferencesCookie = cookie.serialize(
        'rentalPreferences',
        JSON.stringify(convertToSlugRentalPreferences(rentalPreferences))
      )
      document.cookie = `${rentalPreferencesCookie};max-age=${MAX_COOKIE_EXPIRATION_TIME}`
    }
}
