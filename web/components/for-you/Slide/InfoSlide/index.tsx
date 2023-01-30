import { PropsWithChildren, ReactNode } from 'react'
import Slide from '..'
import * as S from './styles'
import { devices } from '@/utils/constants'

const InfoSlide = ({
  title,
  subtitle,
  children,
  isTouchDevice,
  navigateListingsComponent
}: PropsWithChildren<{
  title: string
  subtitle: string
  isTouchDevice: boolean
  navigateListingsComponent: ReactNode
}>) => {
  const info = (
    <S.Container isTouchDevice={isTouchDevice}>
      <S.Title>{title}</S.Title>
      <S.Description>{subtitle}</S.Description>
      {children}
    </S.Container>
  )

  return (
    <Slide
      isTouchDevice={isTouchDevice}
      left={null}
      right={!isTouchDevice && info}
      navigateListingsComponent={navigateListingsComponent}
    >
      {isTouchDevice && info}
    </Slide>
  )
}

export default InfoSlide
