import * as S from './styles'
import mapMarkerIcon from '@/public/icons/map-marker-new.svg'
import Image from 'next/future/image'
import { Title } from '@/components/for-you/Listing/shared/styles'
import { Listing } from 'ratedrentals-types'
import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import MapMarker from '@/components/global/icons/MapMarker'

const MapLocation = ({
  location,
}: {
  location: {
    address: Listing['property']['location']['address']['value']
    province: Listing['property']['location']['region']['province']
    city: Listing['property']['location']['region']['city']
    postalCode: Listing['property']['location']['region']['postalCode']
  }
}) => {
  return (
    <S.Container>
      <Title>Map Location</Title>
      <S.AddressSection>
        <S.IconWrapper>
          <MapMarker size={{ width: 12, height: 12 }} color='#5B5B5B' />
        </S.IconWrapper>
        <S.Address>
          {`${location.address}, ${location.city}, ${location.province.code} ${location.postalCode}` ??
            UNAVAILABLE_SYMBOL}
        </S.Address>
      </S.AddressSection>
    </S.Container>
  )
}

export default MapLocation
