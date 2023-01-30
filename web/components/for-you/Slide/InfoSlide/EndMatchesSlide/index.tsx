import { AvailableCities } from 'ratedrentals-types'
import { ReactNode } from 'react'
import InfoSlide from '..'

const EndMatches = ({ city, isTouchDevice, navigateListingsComponent }: { city: AvailableCities, isTouchDevice: boolean, navigateListingsComponent: ReactNode }) => {
  return (
    <InfoSlide
      navigateListingsComponent={navigateListingsComponent}
      isTouchDevice={isTouchDevice}
      title={`You've reached the end of all listings in ${city.name.display}.`}
      subtitle={'Come back tomorrow to view newly posted listings for you.'}
    />
  )
}

export default EndMatches
