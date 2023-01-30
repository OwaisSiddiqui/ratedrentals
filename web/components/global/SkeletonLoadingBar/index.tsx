import { PropsWithChildren } from 'react'
import * as S from './styles'

export const SkeletonLoadingBar = ({
  size,
  color,
  children,
}: PropsWithChildren<{
  size?: {
    width: string
    height: string
  }
  color?: string
}>) => {
  return (
    <S.Container size={size} color={color ?? '#fafafa'}>
      <S.HiddenContent>{children}</S.HiddenContent>
    </S.Container>
  )
}

export default SkeletonLoadingBar
