import { Listing } from 'ratedrentals-types'
import * as S from './styles'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Chevron from '@/components/global/icons/Chevron'

const Slide = ({
  tour,
  index,
  toursState,
  setCurrentTour3diframe,
}: {
  tour: Listing['property']['tours'][number]
  index: number
  toursState: {
    index: number
    setIndex: Dispatch<SetStateAction<number>>
  }
  setCurrentTour3diframe: Dispatch<
    SetStateAction<HTMLIFrameElement | undefined>
  >
}) => {
  const slide = useRef(null)
  let observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          toursState.setIndex(index)
        }
      },
      { threshold: 0.7 }
    )
  }, [index, toursState])
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (toursState.index === index) {
      if (iframe.current) {
        setCurrentTour3diframe(iframe.current)
      }
    }
  }, [toursState.index, index, iframe, setCurrentTour3diframe])

  useEffect(() => {
    if (slide.current && observer.current) {
      observer.current.observe(slide.current)
    }
  }, [])

  return (
    <S.Slide ref={slide}>
      <S.Tour3dIFrame
        ref={iframe}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        allowFullScreen
        src={`https://my.matterport.com/show/?m=${tour.id}`}
      />
    </S.Slide>
  )
}

const TourViewer = ({
  tours,
  isLoading,
  show,
  toursState,
  setCurrentTour3diframe,
  isTouchDevice,
}: {
  tours: Listing['property']['tours']
  toursState: {
    index: number
    setIndex: Dispatch<SetStateAction<number>>
  }
  isLoading: boolean
  show: boolean
  setCurrentTour3diframe: Dispatch<
    SetStateAction<HTMLIFrameElement | undefined>
  >
  isTouchDevice: boolean
}) => {
  return (
    <>
      {isTouchDevice ? (
        <S.Container show={show}>
          <S.Viewer>
            <S.Wrapper>
              {tours.map((tour, i) => {
                return (
                  <Slide
                    setCurrentTour3diframe={setCurrentTour3diframe}
                    toursState={toursState}
                    tour={tour}
                    key={i}
                    index={i}
                  />
                )
              })}
            </S.Wrapper>
          </S.Viewer>
          <S.TourNumber>
            {isLoading
              ? '0 of 0'
              : `${toursState.index + 1} of ${tours.length}`}
          </S.TourNumber>
        </S.Container>
      ) : (
        <S.DesktopContainer>
          <Slide
            index={toursState.index}
            setCurrentTour3diframe={setCurrentTour3diframe}
            toursState={toursState}
            tour={tours[toursState.index]}
          />
          <S.Arrows>
            <S.Navigate
              disabled={toursState.index === 0}
              onClick={() => {
                toursState.setIndex(prev => prev - 1)
              }}
            >
              <Chevron
                position={'left'}
                size={{
                  width: 35,
                  height: 35,
                }}
                color={'white'}
              />
            </S.Navigate>
            <S.Navigate
              disabled={toursState.index === tours.length - 1}
              onClick={() => {
                toursState.setIndex(prev => prev + 1)
              }}
            >
              <Chevron
                position={'right'}
                size={{
                  width: 35,
                  height: 35,
                }}
                color={'white'}
              />
            </S.Navigate>
          </S.Arrows>
        </S.DesktopContainer>
      )}
    </>
  )
}

export default TourViewer
