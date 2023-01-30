import { Badges, Listing } from 'ratedrentals-types'
import { BADGES } from '@/utils/constants'

const hasWaterHydroHeat = (utilities: string[]) => {
  return (
    utilities.includes('Water') &&
    utilities.includes('Heating') &&
    utilities.includes('Hydro / Electricity')
  )
}

export const getBadges = (listing: Listing): Badges => {
  const badges: Badges = []
  if (listing.property.properties.petFriendly) {
    badges.push(BADGES['petFriendly'])
  }
  if (hasWaterHydroHeat(listing.property.legal.utilities)) {
    badges.push(BADGES['allUtilities'])
  }
  if (listing.promotions.length > 0) {
    badges.push(BADGES['promotions'])
  }
  return badges
}
