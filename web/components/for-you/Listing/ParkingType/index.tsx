import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import { Listing } from 'ratedrentals-types'
import { CircularDetails } from '@/components/for-you/Listing/shared/index'
import * as S from './styles'

const ParkingType = ({
  parkingType,
}: {
  parkingType: Listing['property']['properties']['parkingType']
}) => {
  return (
    <>
      <S.Title>Parking Type</S.Title>
      <CircularDetails details={[parkingType ?? UNAVAILABLE_SYMBOL]} />
    </>
  )
}

export default ParkingType
