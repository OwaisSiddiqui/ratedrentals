import Link from 'next/link'
import { useState } from 'react'
import Chevron from '../../global/icons/Chevron'
import Close from '../../global/icons/Close'
import * as S from './styles'

const BetaHeader = ({ message }: {message: string}) => {
  const [show, setShow] = useState(true)

  return (
    <S.Container show={show}>
      <S.CloseWrapper
        onClick={() => {
          setShow(false)
        }}
      >
        <Close color='#828282' size={{ width: 13, height: 13 }} />
      </S.CloseWrapper>
      <S.Description>{message}</S.Description>
    </S.Container>
  )
}

export default BetaHeader
