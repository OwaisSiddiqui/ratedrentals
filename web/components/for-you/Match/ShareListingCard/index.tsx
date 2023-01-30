import Close from '@/components/global/icons/Close'
import LinkIcon from '@/components/global/icons/Link'
import Open from '@/components/global/icons/Open'
import InfoMessage from '@/components/global/InfoMessage'
import SkeletonLoadingBar from '@/components/global/SkeletonLoadingBar'
import { useSavedListings } from '@/contexts/savedListingsContext'
import { useAppSelector } from '@/redux/hooks'
import { UNAVAILABLE_SYMBOL } from '@/utils/constants'
import { getForYouListingUrl } from '@/utils/url'
import { getAddressURL } from '@/utils/url'
import Image from 'next/future/image'
import Link from 'next/link'
import { Listing } from 'ratedrentals-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as S from './styles'

const ShareListingCard = ({
  backgroundOnClick,
  address,
  id,
  isTouchDevice
}: {
  backgroundOnClick: () => void
  address: string
  id: string
  isTouchDevice: boolean
}) => {
  const city = useAppSelector(state => state.city)

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
                <S.Title>Share listing</S.Title>
                <S.Description>
                  {navigator.clipboard
                    ? 'Choose how you want to share it from the options below.'
                    : ``}
                </S.Description>
              </S.Heading>
              <S.ShareOptions>
                {navigator.clipboard ? (
                  <S.ShareOptionLi>
                    <S.ShareOption
                      onClick={() => {
                        if (city) {
                          navigator.clipboard
                            .writeText(
                              getAddressURL({
                                city: city.name.value,
                                address: address,
                                id: id
                              })
                            )
                            .then(() => {
                              alert('Copied link')
                            })
                            .catch(error => {
                              alert(
                                'Error: Could not copy link. An unknown error occurred.'
                              )
                            })
                        }
                      }}
                    >
                      <LinkIcon size={{ width: 30, height: 30 }} />
                      <S.ShareOptionLabel>Copy link</S.ShareOptionLabel>
                    </S.ShareOption>
                  </S.ShareOptionLi>
                ) : city ? (
                  <S.CopyingNotSupported>
                    <S.AddressLink
                      target='_blank'
                      href={getAddressURL({
                        city: city.name.value,
                        address: address,
                        id: id
                      })}
                    >
                      {address}
                      <Open size={{ width: 20, height: 20 }} />
                    </S.AddressLink>
                  </S.CopyingNotSupported>
                ) : null}
              </S.ShareOptions>
            </S.Wrapper>
          </S.Container>
        </S.MarginWrapper> :
          <S.DesktopContainer onClick={(e) => {
            e.stopPropagation()
          }}>
            <S.Wrapper>
              <S.Heading>
                <S.Title>Share listing</S.Title>
                <S.Description>
                  {navigator.clipboard
                    ? 'Choose how you want to share it from the options below.'
                    : ``}
                </S.Description>
              </S.Heading>
              <S.ShareOptions>
                {navigator.clipboard ? (
                  <S.ShareOptionLi>
                    <S.ShareOption
                      onClick={() => {
                        if (city) {
                          navigator.clipboard
                            .writeText(
                              getAddressURL({
                                city: city.name.value,
                                address: address,
                                id: id
                              })
                            )
                            .then(() => {
                              alert('Copied link')
                            })
                            .catch(error => {
                              alert(
                                'Error: Could not copy link. An unknown error occurred.'
                              )
                            })
                        }
                      }}
                    >
                      <LinkIcon size={{ width: 30, height: 30 }} />
                      <S.ShareOptionLabel>Copy link</S.ShareOptionLabel>
                    </S.ShareOption>
                  </S.ShareOptionLi>
                ) : city ? (
                  <S.CopyingNotSupported>
                    <S.AddressLink
                      target='_blank'
                      href={getAddressURL({
                        city: city.name.value,
                        address: address,
                        id: id
                      })}
                    >
                      {address}
                      <Open size={{ width: 20, height: 20 }} />
                    </S.AddressLink>
                  </S.CopyingNotSupported>
                ) : null}
              </S.ShareOptions>
            </S.Wrapper>
          </S.DesktopContainer>}
      </S.Background>
    </>
  )
}

export default ShareListingCard
