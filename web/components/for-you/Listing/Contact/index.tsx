import { useAppSelector } from '@/redux/hooks'
import * as S from './styles'
import starIcon from '@/public/icons/star.svg'
import { DotSeparator, Title } from '../shared'
import { Listing } from 'ratedrentals-types'
import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import DefaultProfilePicture from '@/components/global/icons/DefaultProfilePicture'
import Open from '@/components/global/icons/Open'
import Link from 'next/link'

const Contact = ({
  poster,
  url,
}: {
  poster: Listing['poster']
  url: Listing['url']
}) => {
  return (
    <S.Container>
      <S.Heading>
        <S.Title>{`Listed By ${
          !poster.name || poster.name === null || poster.name === undefined
            ? UNAVAILABLE_SYMBOL
            : poster.name
        }`}</S.Title>
        <S.ListingFromLink>
          {`Listing from `}
          <S.ListingSourceLink target='_blank' href={url}>
            Rentals.ca
          </S.ListingSourceLink>
        </S.ListingFromLink>
      </S.Heading>
      <S.ProfilePictureContainer
        isInitials={
          !(!poster.name || poster.name === null || poster.name === undefined)
        }
      >
        <S.ProfilePicture>
          {!poster.name || poster.name === null || poster.name === undefined ? (
            <DefaultProfilePicture size={{ width: 30, height: 30 }} />
          ) : (
            <S.ProfileInitials>
              {(() => {
                const names = poster.name.split(' ')
                if (names.length > 1) {
                  return `${names[0][0]}${names[names.length - 1][0]}`
                } else {
                  return `${names[0][0]}`
                }
              })()}
            </S.ProfileInitials>
          )}
        </S.ProfilePicture>
      </S.ProfilePictureContainer>
    </S.Container>
  )
}

export default Contact
