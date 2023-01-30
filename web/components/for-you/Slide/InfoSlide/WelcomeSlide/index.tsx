import { useAppSelector } from '@/redux/hooks'
import { RentalPreferences } from 'ratedrentals-types'
import { ReactNode } from 'react'
import InfoSlide from '../../InfoSlide'
import * as S from './styles'

const WelcomeScreen = ({ isTouchDevice, navigateListingsComponent }: { isTouchDevice: boolean, navigateListingsComponent: ReactNode }) => {
  const rentalPreferences = useAppSelector(state => state.rentalPreferences);

  return (
    <InfoSlide
      navigateListingsComponent={navigateListingsComponent}
      isTouchDevice={isTouchDevice}
      title='Welcome!'
      subtitle={
        isTouchDevice
          ? 'Swipe up to view rental home listings for you.'
          : 'Click the down arrow to view rental home listings for you.'
      }
    >
      <S.YourPreferences>
        Your preferences:
        <S.Preferences>
        {Object.keys(rentalPreferences).map((key, i) => {
          let keyWithType = key as keyof RentalPreferences
          if (!(keyWithType === 'priority')) {
            return <S.Preference key={i}>{`${rentalPreferences[keyWithType].selection ?? rentalPreferences[keyWithType].value} ${keyWithType}`}</S.Preference>
          }
      })}
        </S.Preferences>
      </S.YourPreferences>
    </InfoSlide>
  )
}

export default WelcomeScreen
