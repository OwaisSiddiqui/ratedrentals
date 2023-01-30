import { CITIES, UNAVAILABLE_CIITIES } from '@/utils/constants'
import { AvailableCities, UnavailableCities } from 'ratedrentals-types'

export const getCity = (string: string) => {
  let result: AvailableCities | undefined = CITIES.find(
    city => city.name.value === string
  )
  if (!result) {
    throw new Error('Could not find city. This should not happen.')
  }
  return result
}

export const isAvailableCity = (
  string: string,
  includeUnavailableCities?: boolean
): string is AvailableCities['name']['value'] => {
  let isAvailableCity = false
  CITIES.forEach(city => {
    if (string === city.name.value) {
      isAvailableCity = true
    }
  })
  if (includeUnavailableCities) {
    UNAVAILABLE_CIITIES.forEach(city => {
      if (string === city.name.value) {
        isAvailableCity = true
      }
    })
  }
  return isAvailableCity
}
