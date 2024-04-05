import { dateDifferenceInDays, timeAgo } from '@/utils/miscellaneous'
import { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react'
import * as S from './styles'
import { DotSeparator } from '@/components/for-you/Listing/shared'
import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import Badge from '@/components/for-you/Listing/Badge'
import { Badges as IBadges, Listing } from 'ratedrentals-types'
import SkeletonLoadingBar from '@/components/global/SkeletonLoadingBar'
import Share from '@/components/global/icons/Share'
import Bookmark from '@/components/global/icons/Bookmark'
import Info from '@/components/global/icons/Info'

const PropertyDetail = ({
  children,
  dotSeparator,
  capitalize = true,
}: PropsWithChildren<{
  dotSeparator: {
    show: boolean
    color?: string
  }
  capitalize?: boolean
}>) => {
  return (
    <S.PropertyDetailSection>
      <S.PropertyDetail capitalize={capitalize}>{children}</S.PropertyDetail>
      {dotSeparator.show ? (
        <DotSeparator color={dotSeparator.color ?? 'black'} />
      ) : null}
    </S.PropertyDetailSection>
  )
}

const MainDetails = ({
  isLoading,
  rent,
  dateUpdated,
  homeType,
  beds,
  baths,
  size,
  badges,
  type,
  isViewed,
  daysAgo,
  children,
  isTouchDevice,
  contactButtons,
  isAvailable
}: PropsWithChildren<{
  isLoading: boolean
  rent: Listing['property']['legal']['rent'] | null
  dateUpdated: Listing['date']['updated'] | null
  homeType: Listing['property']['properties']['type'] | null
  beds: Listing['property']['properties']['beds'] | null
  baths: Listing['property']['properties']['baths'] | null
  size: Listing['property']['properties']['size'] | null
  badges: IBadges
  type: 'match' | 'card'
  isViewed: boolean
  daysAgo: number | null
  isTouchDevice: boolean
  contactButtons: ReactNode
  isAvailable: boolean
}>) => {
  return (
    <>
      {isTouchDevice ? (
        <S.Container type={type}>
          <S.Main>
            <S.PriceSection>
              <S.Price>
                {!isViewed && <S.NotViewedIndicator />}
                {isLoading ? (
                  <SkeletonLoadingBar>$9999</SkeletonLoadingBar>
                ) : rent ? (
                  `$${rent}`
                ) : (
                  UNAVAILABLE_SYMBOL
                )}
                {daysAgo ? (
                  daysAgo <= 7 ? (
                    <S.NewBadge>New</S.NewBadge>
                  ) : null
                ) : null}
              </S.Price>
              {children}
            </S.PriceSection>
            <S.Middle>
              <S.PropertyDetailsSection type={type}>
                {isLoading ? (
                  <SkeletonLoadingBar size={{ width: '100%', height: 'auto' }}>
                    ----- - ---- - ---- ----- -------
                  </SkeletonLoadingBar>
                ) : (
                  <>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {homeType ?? UNAVAILABLE_SYMBOL}
                    </PropertyDetail>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {beds ?? UNAVAILABLE_SYMBOL}
                      &nbsp;Beds
                    </PropertyDetail>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {baths ?? UNAVAILABLE_SYMBOL}
                      &nbsp;Baths
                    </PropertyDetail>
                    <PropertyDetail
                      capitalize={false}
                      dotSeparator={{ show: false, color: 'black' }}
                    >
                      {size ?? UNAVAILABLE_SYMBOL}
                      &nbsp;sqft
                    </PropertyDetail>
                  </>
                )}
              </S.PropertyDetailsSection>
              <S.TimeAgo>
                {isLoading ? (
                  <SkeletonLoadingBar>- ---- ---</SkeletonLoadingBar>
                ) : dateUpdated ? timeAgo(dateUpdated) : (
                  UNAVAILABLE_SYMBOL
                )}
              </S.TimeAgo>
            </S.Middle>
          </S.Main>
          <S.NotAvailableSection>
            <S.NotAvailable><Info size={{width: 15, height: 15}} color='white' /> This listing is likely no longer available.</S.NotAvailable>
          </S.NotAvailableSection>
        </S.Container>
      ) : (
        <S.Container type={type}>
          <S.Main>
            <S.PriceSection>
              <S.Price>
                {isLoading ? (
                  <SkeletonLoadingBar>$9999</SkeletonLoadingBar>
                ) : rent ? (
                  `$${rent}`
                ) : (
                  UNAVAILABLE_SYMBOL
                )}
                {daysAgo ? (
                  daysAgo <= 7 ? (
                    <S.NewBadge>New</S.NewBadge>
                  ) : null
                ) : null}
              </S.Price>
              {children}
            </S.PriceSection>
            <S.Middle>
              <S.PropertyDetailsSection type={type}>
                {isLoading ? (
                  <SkeletonLoadingBar size={{ width: '100%', height: 'auto' }}>
                    ----- - ---- - ---- ----- -------
                  </SkeletonLoadingBar>
                ) : (
                  <>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {homeType ?? UNAVAILABLE_SYMBOL}
                    </PropertyDetail>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {beds ?? UNAVAILABLE_SYMBOL}
                      &nbsp;Beds
                    </PropertyDetail>
                    <PropertyDetail
                      dotSeparator={{ show: true, color: 'black' }}
                    >
                      {baths ?? UNAVAILABLE_SYMBOL}
                      &nbsp;Baths
                    </PropertyDetail>
                    <PropertyDetail
                      capitalize={false}
                      dotSeparator={{ show: false, color: 'black' }}
                    >
                      {size ?? UNAVAILABLE_SYMBOL}
                      &nbsp;sqft
                    </PropertyDetail>
                  </>
                )}
              </S.PropertyDetailsSection>
              <S.TimeAgo>
                {isLoading ? (
                  <SkeletonLoadingBar>- days ago</SkeletonLoadingBar>
                ) : dateUpdated ? timeAgo(dateUpdated) : (
                  UNAVAILABLE_SYMBOL
                )}
              </S.TimeAgo>
            </S.Middle>
            {contactButtons}
            
          </S.Main>
        </S.Container>
      )}
    </>
  )
}

export default MainDetails
