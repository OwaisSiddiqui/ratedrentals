import SwipeSlide from '@/components/for-you/Slide/InfoSlide/SwipeSlide'
import { RankedListing } from 'ratedrentals-types'
import { useEffect, useMemo, useState } from 'react'
import Match from '../Match'
import EndMatches from '@/components/for-you/Slide/InfoSlide/EndMatchesSlide'
import { useAppSelector } from '@/redux/hooks'
import BadMatches from '@/components/for-you/Slide/InfoSlide/BadMatches'
import React from 'react'
import FirstBadMatch from '@/components/for-you/Slide/InfoSlide/FirstBadMatchSlide'
import WelcomeSlide from '../Slide/InfoSlide/WelcomeSlide'
import Slide from '../Slide'
import { SavedListingsProvider } from '@/contexts/savedListingsContext'
import Slider from '../Slider'
import { useViewedListings } from '@/contexts/viewedListingsContext'
import * as S from './styles'
import Chevron from '@/components/global/icons/Chevron'
import { isTouchDevice as isTouchDeviceFunc } from '@/utils/miscellaneous'

export const NavigateListings = ({ currentIndex, maxIndex, onClick }: {
  currentIndex: number
  maxIndex: number
  onClick: {
    prev: any
    next: any
  }
}) => {
  return (
    <S.PrevNext>
      <S.Prev disabled={currentIndex === 0}
        onClick={onClick.prev}>Prev</S.Prev>
      <S.Next disabled={currentIndex === maxIndex} onClick={onClick.next}>Next Listing</S.Next>
    </S.PrevNext>
  )
}

export const Matches = ({
  rankedListings,
  isReturningUser,
}: {
  rankedListings: RankedListing[]
  isReturningUser: boolean
}) => {
  const [matchesIndex, setMatchesIndex] = useState(0)
  const [numberOfMatches, setNumberOfMatches] = useState(1)
  const [lastSlideRef, setLastSlideRef] = useState<HTMLDivElement | null>(null)
  const city = useAppSelector(state => state.city)
  const { ids: viewedListingsIds, dispatchListingsData: dispatchViewedListingsData } = useViewedListings()
  const [unviewedRankedListings, setUnviewedRankedListings] = useState<
    RankedListing[]
  >([])
  const badMatchesSlideNumber = useMemo(() => {
    const number = unviewedRankedListings.findIndex(
      (value, index) => value.score >= 0.1
    )
    return number
  }, [unviewedRankedListings])
  const [isViewedListingsSetOnce, setIsViewedListingsSetOnce] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null)
  const [isViewMoreDetails, setIsViewMoreDetails] = useState(false)

  useEffect(() => {
    if (lastSlideRef) {
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          setNumberOfMatches(prev => prev + 1)
          observer.disconnect()
        }
      })
      observer.observe(lastSlideRef)
    }
  }, [lastSlideRef])

  useEffect(() => {
    if (viewedListingsIds && !isViewedListingsSetOnce) {
      setUnviewedRankedListings(
        rankedListings.filter(rankedListing => {
          return !viewedListingsIds.includes(rankedListing._id)
        })
      )
      setIsViewedListingsSetOnce(true)
    }
  }, [isViewedListingsSetOnce, rankedListings, viewedListingsIds])

  useEffect(() => {
    setIsTouchDevice(isTouchDeviceFunc())
  }, [])

  const navigateListingsComponent = <NavigateListings currentIndex={matchesIndex} maxIndex={unviewedRankedListings.length - 1} onClick={
    {
      prev: () => {
        setMatchesIndex(prev => prev - 1)
      },
      next: () => {
        setMatchesIndex(prev => prev + 1)
      }
    }
  } />

  return (
    <SavedListingsProvider>
      {typeof isTouchDevice === 'boolean' ? (
        <>
          {isTouchDevice ? (
            <S.MobileContainer>
              <Slider>
                {!isReturningUser ? (
                  <SwipeSlide isTouchDevice={isTouchDevice} navigateListingsComponent={null} />
                ) : (
                  <WelcomeSlide isTouchDevice={isTouchDevice} navigateListingsComponent={null} />
                )}
                <SavedListingsProvider>
                  {Array(
                    Math.min(numberOfMatches, unviewedRankedListings.length)
                  )
                    .fill(1)
                    .map((el, i) => {
                      const rankedListing = unviewedRankedListings[i]
                      return (
                        <React.Fragment key={i}>
                          {city && badMatchesSlideNumber === 0 && i === 0 ? (
                            <FirstBadMatch
                            navigateListingsComponent={navigateListingsComponent}
                            isTouchDevice={isTouchDevice}
                              amount={unviewedRankedListings.length}
                              city={city}
                            />
                          ) : i !== -1 && i === badMatchesSlideNumber ? (
                            <BadMatches navigateListingsComponent={navigateListingsComponent} isTouchDevice={isTouchDevice} />
                          ) : null}
                          <Slide
                            isViewMoreDetails={isViewMoreDetails}
                            navigateListingsComponent={null}
                            ref={newRef => {
                              if (i === numberOfMatches - 1) {
                                setLastSlideRef(newRef)
                              }
                            }}
                            right={undefined}
                            left={undefined}
                            isTouchDevice={isTouchDevice}
                          >
                            <Match
                              isViewMoreDetailsState={{
                                setValue: setIsViewMoreDetails,
                                value: isViewMoreDetails
                              }}
                              isTouchDevice={isTouchDevice}
                              isForYouIdPage={false}
                              rankedListing={rankedListing}
                              isSlide={true}
                              resetSlides={() => {
                                setNumberOfMatches(1)
                                if (lastSlideRef) {
                                  lastSlideRef.scrollIntoView()
                                }
                              }}
                              navigateListingsComponent={null}
                            />
                          </Slide>
                        </React.Fragment>
                      )
                    })}
                </SavedListingsProvider>
                {numberOfMatches >= unviewedRankedListings.length ? (
                  <Slide
                  isViewMoreDetails={isViewMoreDetails}
                  navigateListingsComponent={null}
                    right={undefined}
                    left={undefined}
                    isTouchDevice={isTouchDevice}
                  >
                    {city ? <EndMatches navigateListingsComponent={navigateListingsComponent} isTouchDevice={isTouchDevice} city={city} /> : null}
                  </Slide>
                ) : null}
              </Slider>
            </S.MobileContainer>
          ) : (
            <>
              {matchesIndex === 0 ? (
                isReturningUser ? (
                  <WelcomeSlide isTouchDevice={isTouchDevice} navigateListingsComponent={navigateListingsComponent} />
                ) : (
                  <SwipeSlide isTouchDevice={isTouchDevice} navigateListingsComponent={navigateListingsComponent} />
                )
              ) : null}
              {matchesIndex !== 0 && (
                <Match
                  isViewMoreDetailsState={{
                    setValue: setIsViewMoreDetails,
                    value: isViewMoreDetails
                  }}
                  isTouchDevice={isTouchDevice}
                  isForYouIdPage={false}
                  rankedListing={unviewedRankedListings[matchesIndex]}
                  isSlide={true}
                  resetSlides={() => {
                    setNumberOfMatches(1)
                    if (lastSlideRef) {
                      lastSlideRef.scrollIntoView()
                    }
                  }}
                  key={matchesIndex}
                  navigateListingsComponent={navigateListingsComponent}
                />
              )}
            </>
          )}
        </>
      ) : null}
    </SavedListingsProvider>
  )
}

export default Matches
