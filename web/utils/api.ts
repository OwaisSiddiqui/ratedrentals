export const getListingById = async (id: string) => {
  return fetch(`/api/listing/${id}`).then(response => response.json())
}

import { AvailableCities, RentalPreferences } from 'ratedrentals-types'

export const getListings = async ({
  city,
  rentalPreferences,
  page,
}: {
  city: AvailableCities
  rentalPreferences?: RentalPreferences
  page: string
}) => {
  return fetch('/api/listings', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      city: city.name.value,
      rentalPreferences: rentalPreferences ?? '',
      page: page,
    }),
  }).then(response => response.json())
}
