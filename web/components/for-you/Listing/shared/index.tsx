import * as S from './styles'
import dotIcon from '@/public/icons/dot.svg'
import { PropsWithChildren } from 'react'
import Dot from '@/components/global/icons/Dot'

export const None = () => {
  return <S.None>None</S.None>
}

interface CircularDetailsProps {
  details: string[]
}

export const CircularDetails = ({ details }: CircularDetailsProps) => {
  return (
    <>
      {details.length > 0 ? (
        <S.CircularDetails>
          {details.map((detail, index) => {
            return <S.CircularDetail key={index}>{detail}</S.CircularDetail>
          })}
        </S.CircularDetails>
      ) : (
        <None />
      )}
    </>
  )
}

export const DotSeparator = ({ color }: { color?: string }) => {
  return <Dot color={color} />
}

export const Title = ({ children }: PropsWithChildren<{}>) => {
  return <S.Title>{children}</S.Title>
}
