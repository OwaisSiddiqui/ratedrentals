import { Listing } from 'ratedrentals-types'
import { useEffect, useRef, useState } from 'react'
import * as S from './styles'
import chevronRightIcon from '@/public/icons/chevron-right.svg'
import Chevron from '@/components/global/icons/Chevron'

const Description = ({
  description,
}: {
  description: Listing['description']
}) => {
  const descriptionRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)
  const [isOverflown, setIsOverflown] = useState(false)

  const toggleShow = () => {
    setShow(prev => !prev)
  }

  const isOverflownFunc = (element: Element) => {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    )
  }

  useEffect(() => {
    const expandDescription = (element: HTMLDivElement) => {
      if (show) {
        element.style.overflow = 'none'
        element.style.maxHeight = 'none'
      } else {
        element.style.overflow = 'hidden'
        element.style.maxHeight = '10rem'
      }
    }

    if (descriptionRef.current) {
      expandDescription(descriptionRef.current)
    }
  }, [show])

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflown(isOverflownFunc(descriptionRef.current))
    }
  }, [descriptionRef])

  return (
    <S.Container isOverflown={isOverflown}>
      <S.Description
        ref={descriptionRef}
        dangerouslySetInnerHTML={{ __html: description ?? 'No description' }}
      ></S.Description>
      {isOverflown ? (
        <>
          <S.ShowMoreSection onClick={toggleShow}>
            <S.ShowMore>Show {show ? 'Less' : 'More'}</S.ShowMore>
            <Chevron
              color='grey'
              size={{ width: 13, height: 13 }}
              position={show ? 'up' : 'down'}
            />
          </S.ShowMoreSection>
        </>
      ) : null}
    </S.Container>
  )
}

export default Description
