import Close from '@/components/global/icons/Close'
import SkeletonLoadingBar from '@/components/global/SkeletonLoadingBar'
import { useSavedListings } from '@/contexts/savedListingsContext'
import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import { toUpperCaseFirstLetter } from '@/utils/miscellaneous'
import { getAddressURL } from '@/utils/url'
import Image from 'next/future/image'
import Link from 'next/link'
import { AvailableCities, Listing } from 'ratedrentals-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as S from './styles'

const SavedListingsCard = ({
  backgroundOnClick,
  isTouchDevice
}: {
  backgroundOnClick: () => void
  isTouchDevice: boolean
}) => {
  const { listingsData, dispatchListingsData } = useSavedListings()
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      <S.Background
        onClick={e => {
          e.stopPropagation()
          backgroundOnClick()
        }}
      >
        {isTouchDevice ? <S.MarginWrapper
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <S.Container>
            <S.Wrapper>
              <S.Heading>
                <S.Title>
                  Your saved listings
                  <S.EditButton
                    onClick={e => {
                      e.preventDefault()
                      setIsEdit(prev => !prev)
                    }}
                  >
                    {isEdit ? 'Done' : 'Edit'}
                  </S.EditButton>
                </S.Title>
                <S.Description>
                  {
                    "Click on the listing card to view more details. Click on the 'Edit' button to remove a saved listing."
                  }
                </S.Description>
              </S.Heading>
              <S.SavedListings>
                {listingsData.length > 0 ? (
                  listingsData.map((listingData, i) => {
                    const listing = listingData.listing
                    const isLoading = !listing
                    return (
                      <S.SavedListingLi key={listingData._id}>
                        <S.SavedListing>
                          {isEdit ? (
                            <S.DeleteButtonWrapper>
                              <S.DeleteButton
                                onClick={() => {
                                  dispatchListingsData({
                                    type: 'remove',
                                    payload: {
                                      id: listingData._id,
                                    },
                                  })
                                }}
                              >
                                <Close
                                  size={{ width: 30, height: 30 }}
                                  color='white'
                                />
                              </S.DeleteButton>
                            </S.DeleteButtonWrapper>
                          ) : null}
                          {listing && listing.property.location.region.city ? (
                            <Link
                              href={getAddressURL({
                                city: listing.property.location.region.city.toLowerCase(),
                                address: listing.property.location.address.value ?? '',
                                id: listing._id
                              })}
                              passHref
                              key={listingData._id}
                            >
                              <S.LinkContainer target='_blank'>
                                <S.Picture isLoading={isLoading}>
                                  {!isLoading && listing ? (
                                    <Image
                                      style={{ objectFit: 'cover' }}
                                      src={
                                        listing.property.photos[0].scales.small
                                          .url
                                      }
                                      fill
                                      alt={listing.property.photos[0].alt}
                                    />
                                  ) : null}
                                </S.Picture>
                                <S.RightSide>
                                  <S.TitleAddress>
                                    {!isLoading && listing ? (
                                      `${listing.property.location.address.value}, ${listing.property.location.region.city}, ${listing.property.location.region.province.code}`
                                    ) : (
                                      <SkeletonLoadingBar
                                        size={{ width: '100%', height: 'auto' }}
                                      >
                                        -- ----- -----
                                      </SkeletonLoadingBar>
                                    )}
                                  </S.TitleAddress>
                                  <S.ListingDescription>
                                    {!isLoading && listing ? (
                                      `${toUpperCaseFirstLetter(
                                        listing.property.properties.type ?? ''
                                      )} • ${
                                        listing.property.properties.beds
                                      } Beds • ${
                                        listing.property.properties.baths
                                      } Baths • ${
                                        listing.property.properties.size ??
                                        UNAVAILABLE_SYMBOL
                                      } sqft`
                                    ) : (
                                      <SkeletonLoadingBar
                                        size={{ width: '70%', height: 'auto' }}
                                      >{`-----  • -----  • -----  • -----`}</SkeletonLoadingBar>
                                    )}
                                  </S.ListingDescription>
                                </S.RightSide>
                              </S.LinkContainer>
                            </Link>
                          ) : null}
                        </S.SavedListing>
                      </S.SavedListingLi>
                    )
                  })
                ) : (
                  <S.None>None</S.None>
                )}
              </S.SavedListings>
            </S.Wrapper>
          </S.Container>
        </S.MarginWrapper> : <S.DesktopContainer onClick={(e) => {
          e.stopPropagation()
        }}>
            <S.Wrapper>
              <S.Heading>
                <S.Title>
                  Your saved listings
                  <S.EditButton
                    onClick={e => {
                      e.preventDefault()
                      setIsEdit(prev => !prev)
                    }}
                  >
                    {isEdit ? 'Done' : 'Edit'}
                  </S.EditButton>
                </S.Title>
                <S.Description>
                  {
                    "Click on the listing card to view more details. Click on the 'Edit' button to remove a saved listing."
                  }
                </S.Description>
              </S.Heading>
              <S.SavedListings>
                {listingsData.length > 0 ? (
                  listingsData.map((listingData, i) => {
                    const listing = listingData.listing
                    const isLoading = !listing
                    return (
                      <S.SavedListingLi key={listingData._id}>
                        <S.SavedListing>
                          {isEdit ? (
                            <S.DeleteButtonWrapper>
                              <S.DeleteButton
                                onClick={() => {
                                  dispatchListingsData({
                                    type: 'remove',
                                    payload: {
                                      id: listingData._id,
                                    },
                                  })
                                }}
                              >
                                <Close
                                  size={{ width: 30, height: 30 }}
                                  color='white'
                                />
                              </S.DeleteButton>
                            </S.DeleteButtonWrapper>
                          ) : null}
                          {listing && listing.property.location.region.city ? (
                            <Link
                              href={getAddressURL({
                                city: listing.property.location.region.city.toLowerCase(),
                                address:
                                  listing.property.location.address.value ?? '',
                                id: listing._id
                              })}
                              passHref
                              key={listingData._id}
                            >
                              <S.LinkContainer target='_blank'>
                                <S.Picture isLoading={isLoading}>
                                  {!isLoading && listing ? (
                                    <Image
                                      style={{ objectFit: 'cover' }}
                                      src={
                                        listing.property.photos[0].scales.small
                                          .url
                                      }
                                      fill
                                      alt={listing.property.photos[0].alt}
                                    />
                                  ) : null}
                                </S.Picture>
                                <S.RightSide>
                                  <S.TitleAddress>
                                    {!isLoading && listing ? (
                                      `${listing.property.location.address.value}, ${listing.property.location.region.city}, ${listing.property.location.region.province.code}`
                                    ) : (
                                      <SkeletonLoadingBar
                                        size={{ width: '100%', height: 'auto' }}
                                      >
                                        -- ----- -----
                                      </SkeletonLoadingBar>
                                    )}
                                  </S.TitleAddress>
                                  <S.ListingDescription>
                                    {!isLoading && listing ? (
                                      `${toUpperCaseFirstLetter(
                                        listing.property.properties.type ?? ''
                                      )} • ${
                                        listing.property.properties.beds
                                      } Beds • ${
                                        listing.property.properties.baths
                                      } Baths • ${
                                        listing.property.properties.size ??
                                        UNAVAILABLE_SYMBOL
                                      } sqft`
                                    ) : (
                                      <SkeletonLoadingBar
                                        size={{ width: '70%', height: 'auto' }}
                                      >{`-----  • -----  • -----  • -----`}</SkeletonLoadingBar>
                                    )}
                                  </S.ListingDescription>
                                </S.RightSide>
                              </S.LinkContainer>
                            </Link>
                          ) : null}
                        </S.SavedListing>
                      </S.SavedListingLi>
                    )
                  })
                ) : (
                  <S.None>None</S.None>
                )}
              </S.SavedListings>
            </S.Wrapper>
          </S.DesktopContainer>}
      </S.Background>
    </>
  )
}

export default SavedListingsCard
