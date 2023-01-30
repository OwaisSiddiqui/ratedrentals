import { PropsWithChildren } from 'react'
import * as S from './styles'

const Slider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <S.Container>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  )
}

export default Slider
