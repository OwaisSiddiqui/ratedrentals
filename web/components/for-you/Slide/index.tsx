import React, { ReactNode } from 'react'
import { PropsWithChildren } from 'react'
import * as S from './styles'

const Slide = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    right: ReactNode | null
    left: ReactNode | null
    isTouchDevice: boolean
    navigateListingsComponent: ReactNode
    isViewMoreDetails?: boolean
  }>
>((props, ref) => {
  return (
    <>
      {props.isTouchDevice ? (
          <S.MobileContainer ref={ref}>{props.children}</S.MobileContainer>
      ) : (
          <S.DesktopContainer>
            <S.Left>{props.left}</S.Left>
            <S.Right>
              <S.RightWrapper isViewMoreDetails={props.isViewMoreDetails ?? false}>{props.right}<S.NavigationListingsComponentWrapper>{props.navigateListingsComponent}</S.NavigationListingsComponentWrapper></S.RightWrapper>
              
            </S.Right>
          </S.DesktopContainer>
      )}
    </>
  )
})

Slide.displayName = 'Slide'

export default Slide
