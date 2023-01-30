import Link from 'next/link'
import { useState } from 'react'
import Chevron from '../../global/icons/Chevron'
import Close from '../../global/icons/Close'
import * as S from './styles'

const BetaHeader = () => {
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
      <S.Description>This website is in beta status.</S.Description>
      <Link href='/beta' passHref>
        <S.LearnMore>
          Learn more{' '}
          <Chevron
            color='gray'
            position='right'
            size={{ width: 10, height: 10 }}
          />
        </S.LearnMore>
      </Link>
    </S.Container>
  )
}

export default BetaHeader
