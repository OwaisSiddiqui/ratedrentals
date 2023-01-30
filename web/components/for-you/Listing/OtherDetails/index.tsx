import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import { Listing } from 'ratedrentals-types'
import { Title } from '@/components/for-you/Listing/shared/styles'
import * as S from './styles'

const OtherDetails = ({ listing }: { listing: Listing }) => {
  return (
    <>
      <Title>Other Details</Title>
      <S.Details>
        <S.DetailSection>
          <S.DetailCategory>Housing</S.DetailCategory>
          <S.Detail>{listing.property.housing ?? UNAVAILABLE_SYMBOL}</S.Detail>
        </S.DetailSection>
        <S.DetailSection>
          <S.DetailCategory>Furnished</S.DetailCategory>
          <S.Detail>
            {listing.property.properties.furnished === null
              ? UNAVAILABLE_SYMBOL
              : listing.property.properties.furnished === true
              ? 'Yes'
              : 'No'}
          </S.Detail>
        </S.DetailSection>
        <S.DetailSection>
          <S.DetailCategory>Pet Friendly</S.DetailCategory>
          <S.Detail>
            {listing.property.properties.petFriendly === null
              ? UNAVAILABLE_SYMBOL
              : listing.property.properties.petFriendly === true
              ? 'Yes'
              : 'No'}
          </S.Detail>
        </S.DetailSection>
        <S.DetailSection>
          <S.DetailCategory>Lease Term</S.DetailCategory>
          <S.Detail>
            {listing.property.legal.lease.term ?? UNAVAILABLE_SYMBOL}
          </S.Detail>
        </S.DetailSection>
        <S.DetailSection>
          <S.DetailCategory>Short Term</S.DetailCategory>
          <S.Detail>
            {listing.property.legal.lease.short === null
              ? UNAVAILABLE_SYMBOL
              : listing.property.legal.lease.short === true
              ? 'Yes'
              : 'No'}
          </S.Detail>
        </S.DetailSection>
      </S.Details>
    </>
  )
}

export default OtherDetails
