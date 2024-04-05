import Image from 'next/future/image'
import { Listing } from 'ratedrentals-types'
import { Dispatch, useEffect, useRef, useState, SetStateAction } from 'react'
import Move from '@/components/global/icons/Move'
import Chevron from '@/components/global/icons/Chevron'
import * as S from './styles'

const Slide = ({
  photo,
  index,
  photoState,
  allowShowFullImage,
  isTouchDevice,
}: {
  photo: Listing['property']['photos'][number]
  index: number
  photoState: {
    index: number
    setIndex: Dispatch<SetStateAction<number>>
  }
  allowShowFullImage: boolean
  isTouchDevice: boolean
}) => {
  const slide = useRef<HTMLDivElement | null>(null)
  let observer = useRef<IntersectionObserver | null>(null)
  const [showFullImage, setShowFullImage] = useState(false)
  const cover = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          photoState.setIndex(index)
        }
      },
      { threshold: 0.7 }
    )
  }, [index, photoState])

  useEffect(() => {
    if (slide.current && observer.current) {
      observer.current.observe(slide.current)
    } else if (cover.current && observer.current) {
      observer.current.observe(cover.current)
    }
  }, [])

  useEffect(() => {
    if (!isTouchDevice && photoState.index === index && cover.current) {
      cover.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'})
    }
  }, [isTouchDevice, photoState.index, index])

  return (
    <>
    {isTouchDevice ?
    <S.Slide
      ref={slide}
      onClick={() => {
        if (allowShowFullImage) {
          setShowFullImage(prev => !prev)
        }
      }}
    >
      <Image
        src={photo.scales.large.url}
        alt={photo.alt}
        priority={true}
        fill
        style={{
          objectFit: showFullImage ? 'scale-down' : 'cover',
        }}
        quality={100}
        unoptimized
      />
    </S.Slide>
    : <S.DesktopSlideContainer show={photoState.index === index}>
    <S.CoverWrapper size={photo.scales.large.size} show={photoState.index === index} background={photo.scales.large.url}>
      <S.Cover ref={cover}>
        <Image
          src={photo.scales.large.url}
          alt={photo.alt}
          priority={true}
          fill
          style={{
            objectFit: 'scale-down',
            opacity: photoState.index === index ? '1' : '0.3',
            transition: 'all 100ms ease-in',
            boxShadow: '0 30px 30px rgba(255, 255, 255, 0.2)'
          }}
          quality={100}
          unoptimized 
        />
        
      </S.Cover>
    </S.CoverWrapper>
  </S.DesktopSlideContainer>}
    </>
  )
}

const PhotoViewer = ({
  photos,
  photoState,
  isTouchDevice,
  allowShowFullImage,
  isViewMoreDetailsState
}: {
  photos: Listing['property']['photos']
  isLoading: boolean
  show: boolean
  photoState: {
    index: number
    setIndex: Dispatch<SetStateAction<number>>
  }
  showPhotoNumber: boolean
  allowShowFullImage: boolean
  isTouchDevice: boolean
  isViewMoreDetailsState: {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
  }
}) => {
  return (
    <>
      {isTouchDevice ? (
        <S.MobileWrapper>
          <S.MobileContainer>
            <S.Viewer>
              <S.Wrapper>
                {photos.map((photo, i) => {
                  return (
                    <Slide
                      isTouchDevice={true}
                      allowShowFullImage={allowShowFullImage}
                      photoState={photoState}
                      photo={photo}
                      key={i}
                      index={i}
                    />
                  )
                })}
              </S.Wrapper>
            </S.Viewer>
          </S.MobileContainer>
        </S.MobileWrapper>
      ) : (
        <S.DesktopWrapper>
          <S.DesktopContainer onClick={(e) => {
            e.stopPropagation()
            if (isViewMoreDetailsState.value) {
              isViewMoreDetailsState.setValue(false)
            }
          }} isViewMoreDetails={isViewMoreDetailsState.value}>
            {photos.map((photo, i) => {
              return (
                <Slide
                  
                  key={i}
                  isTouchDevice={false}
                  allowShowFullImage={allowShowFullImage}
                  photoState={photoState}
                  photo={photo}
                  index={i}
                />
              )
            })}
            <S.Arrows isViewMoreDetails={isViewMoreDetailsState.value}>
              <S.Navigate
                disabled={photoState.index === 0}
                onClick={(e) => {
                  e.stopPropagation()
                  photoState.setIndex(prev => prev - 1)
                }}
              >
                <Chevron
                  position={'up'}
                  size={{
                    width: 23,
                    height: 23,
                  }}
                  color={'black'}
                />
              </S.Navigate>
              <S.Navigate
                disabled={photoState.index === photos.length - 1}
                onClick={(e) => {
                  e.stopPropagation()
                  photoState.setIndex(prev => prev + 1)
                }}
              >
                <Chevron
                  position={'down'}
                  size={{
                    width: 23,
                    height: 23,
                  }}
                  color={'black'}
                />
              </S.Navigate>
            </S.Arrows>
          </S.DesktopContainer>
        </S.DesktopWrapper>
      )}
    </>
  )
}

export default PhotoViewer
