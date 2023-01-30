import { AvailableCities } from 'ratedrentals-types'
import { ReactNode } from 'react'
import InfoSlide from '../../InfoSlide'

const FirstBadMatch = ({
  amount,
  city,
  isTouchDevice,
  navigateListingsComponent
}: {
  amount: number
  city: AvailableCities
  isTouchDevice: boolean
  navigateListingsComponent: ReactNode
}) => {
  return (
    <InfoSlide
      navigateListingsComponent={navigateListingsComponent}
      isTouchDevice={isTouchDevice}
      title={`We couldn't find any good matches for your preferences from the ${amount} listings in ${city.name.display}`}
      subtitle={
        'Continue swiping for less relevant matches. Come back tomorrow to view newly posted listings for you.'
      }
    />
  )
}

export default FirstBadMatch
