import { ReactNode } from 'react'
import InfoSlide from '..'
import ScreenLayout from '..'

export const BadMatches = ({ isTouchDevice, navigateListingsComponent }: {
  isTouchDevice: boolean
  navigateListingsComponent: ReactNode
}) => {
  return (
    <InfoSlide
      navigateListingsComponent={navigateListingsComponent}
      title={'Those are our best matches for your preferences.'}
      subtitle={'Continue swiping for less relevant matches. Come back tomorrow to view newly posted listings for you.'} isTouchDevice={isTouchDevice}    />
  )
}

export default BadMatches
