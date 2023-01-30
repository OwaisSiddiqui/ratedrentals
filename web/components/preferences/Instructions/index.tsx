import { useState } from 'react'
import * as S from './styles'

const Instructions = () => {
  const [show, setShow] = useState(true)

  return (
    <S.Container show={show}>
      <S.Heading>
        <S.Title>Choose your rental home preferences</S.Title>
        <S.Description>
          We are not like every other rental homes site. We try to help you find
          your next rental home by giving you the best rental home listings for
          your preferences. Get started by answering a few questions about what
          you are looking for in next your rental home.
        </S.Description>
        <S.Next
          onClick={() => {
            setShow(false)
          }}
        >
          Next
        </S.Next>
      </S.Heading>
    </S.Container>
  )
}

export default Instructions
