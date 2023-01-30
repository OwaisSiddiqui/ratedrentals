import { useAppSelector } from '@/redux/hooks'
import React, { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import MapLocation from './MapLocation'
import * as S from './styles'
import MainDetails from './MainDetails'
import Description from './Description'
import Contact from './Contact'
import IncludedUtilities from './IncludedUtilities'
import UnitFeatures from './features/UnitFeatures'
import BuilidingFeatures from './features/BuilidingFeatures'
import ParkingType from './ParkingType'
import OtherDetails from './OtherDetails'
import GoogleMap from './GoogleMap'
import Footer from '@/components/global/Footer'
import { Listing } from 'ratedrentals-types'
import Info from '@/components/global/icons/Info'
import { getBadges } from '@/utils/card'
import Promotions from './Promotions'
import Share from '@/components/global/icons/Share'
import Bookmark from '@/components/global/icons/Bookmark'
import Image from 'next/future/image'
import ThreeDotsVertical from '@/components/global/icons/ThreeDotsVertical'
import Filter from '@/components/global/icons/Filter'
import InArticleListingAd from '@/components/global/Ad/InArticleListingAd'
import { SetState } from 'immer/dist/internal'

const ListingViewer = ({
  listing,
  type,
  children,
  isBottomOpen,
  isTouchDevice,
  firstPhoto,
  threeDotsMenuPopup,
  isAvailable,
  isViewMoreDetailsState
}: PropsWithChildren<{
  listing: Listing | undefined
  type: 'match' | 'card'
  isBottomOpen: boolean
  isTouchDevice: boolean
  firstPhoto: Listing['property']['photos'][number] | undefined
  threeDotsMenuPopup: ReactNode
  isAvailable: boolean
  isViewMoreDetailsState: {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
  }
}>) => {

  return (
    <>
      {isTouchDevice ? (
        <>
            <S.MainContent>
              <S.MainDetailsSection isBottomOpen={isBottomOpen}>
                {children}
              </S.MainDetailsSection>
              {isBottomOpen &&
              <S.MobileSections>
                {listing ? (
                  <>
                    <S.Section>
                      <Description description={listing.description} />
                    </S.Section>

                    {listing.promotions.length > 0 ? (
                      <>
                        <S.Section>
                          <Promotions promotions={listing.promotions} />
                        </S.Section>
                      </>
                    ) : null}



                    <S.Section>
                      <Contact poster={listing.poster} url={listing.url} />
                    </S.Section>

                    <S.Section>
                      <MapLocation
                        location={{
                          address: listing.property.location.address.value,
                          city: listing.property.location.region.city,
                          province: listing.property.location.region.province,
                          postalCode:
                            listing.property.location.region.postalCode,
                        }}
                      />
                    </S.Section>

                    <S.Section>
                      <IncludedUtilities
                        utilities={listing.property.legal.utilities}
                      />
                    </S.Section>

                    <S.Section>
                      <UnitFeatures features={listing.property.features.unit} />
                    </S.Section>

                    <S.Section>
                      <BuilidingFeatures
                        features={listing.property.features.building}
                      />
                    </S.Section>

                    <S.Section>
                      <ParkingType
                        parkingType={listing.property.properties.parkingType}
                      />
                    </S.Section>

                    <S.Section>
                      <OtherDetails listing={listing} />
                    </S.Section>

                  </>
                ) : null}
              </S.MobileSections>}
            </S.MainContent>
        </>
      ) : (
        <S.DesktopWrapper>
          <S.DesktopContainer>
            <S.TopSticky>
              <S.TopImageCover>
                {firstPhoto && (
                  <Image
                    src={firstPhoto.scales.large.url}
                    alt={firstPhoto.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </S.TopImageCover>
              <S.TopAddress>
                <S.TopAddressText>
                  {listing
                    ? `${listing.property.location.address.value}, ${listing.property.location.region.city}, ${listing.property.location.region.province.code}`
                    : ''}
                </S.TopAddressText>
                {threeDotsMenuPopup}
              </S.TopAddress>
              <S.DesktopMainDetailsSection isBottomOpen={isBottomOpen}>
                {children}
              </S.DesktopMainDetailsSection>
            </S.TopSticky>
            <S.DesktopBottom show={isViewMoreDetailsState.value} background={firstPhoto?.scales.large.url ?? ''}>
              {!isAvailable && <S.NotAvailableSection>
                <S.NotAvailable><Info color='white' size={{width: 14, height: 14}}/> This listing is no longer available.</S.NotAvailable>
              </S.NotAvailableSection>}
              <S.DesktopSections>
                {listing ? (
                  <>
                    <S.Section>
                      <Description description={listing.description} />
                    </S.Section>
                    {listing.promotions.length > 0 ? (
                      <>
                        <S.Section>
                          <Promotions promotions={listing.promotions} />
                        </S.Section>
                      </>
                    ) : null}

                    <S.Section>
                      <Contact poster={listing.poster} url={listing.url} />
                    </S.Section>
                    <S.Section>
                      <MapLocation
                        location={{
                          address: listing.property.location.address.value,
                          city: listing.property.location.region.city,
                          province: listing.property.location.region.province,
                          postalCode:
                            listing.property.location.region.postalCode,
                        }}
                      />
                    </S.Section>

                    <S.Section>
                      <IncludedUtilities
                        utilities={listing.property.legal.utilities}
                      />
                    </S.Section>

                    <S.Section>
                      <UnitFeatures features={listing.property.features.unit} />
                    </S.Section>

                    <S.Section>
                      <BuilidingFeatures
                        features={listing.property.features.building}
                      />
                    </S.Section>

                    <S.Section>
                      <ParkingType
                        parkingType={listing.property.properties.parkingType}
                      />
                    </S.Section>

                    <S.Section>
                      <OtherDetails listing={listing} />
                    </S.Section>

                  </>
                ) : null}
              </S.DesktopSections>
            </S.DesktopBottom>
            <S.ViewMoreDetails show={!isViewMoreDetailsState.value} onClick={() => {
              isViewMoreDetailsState.setValue(true)
            }}>View more details</S.ViewMoreDetails>
          </S.DesktopContainer>
        </S.DesktopWrapper>
      )}
    </>
  )
}

export default ListingViewer
