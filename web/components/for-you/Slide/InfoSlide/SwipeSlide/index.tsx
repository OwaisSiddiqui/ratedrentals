import { ReactNode } from 'react'
import InfoSlide from '..'
import * as S from './styles'

const SwipeSlide = ({ isTouchDevice, navigateListingsComponent }: { isTouchDevice: boolean, navigateListingsComponent: ReactNode }) => {
  return (
    <InfoSlide
    navigateListingsComponent={navigateListingsComponent}
      isTouchDevice={isTouchDevice}
      title={
        isTouchDevice
          ? 'Swipe up to view your rental home matches!'
          : 'Use the buttons below to go through your rental home matches!'
      }
      subtitle={
        isTouchDevice
          ? 'Click on the bottom listing card to view more details and swipe right to view more photos. If you like your match, you can contact the listing poster by visiting the external site. Keep swiping for new rental home matches!'
          : 'Scroll on the right card to view more details. Use the left and right arrows to view more pictures.'
      }
    />
  )
}

export default SwipeSlide
