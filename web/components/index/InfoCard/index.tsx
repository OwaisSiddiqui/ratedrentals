import React from 'react'
import Chevron from '../../global/icons/Chevron'
import * as S from './styles'

const InfoCard = ({
  title,
  description,
}: {
  title: {
    main: string
    sub: string
  }
  description: string
}) => {
  return (
    <S.Container>
      <S.Content>
        <S.Titles>
          <S.SubTitle>{title.sub}</S.SubTitle>
          <S.Title>{title.main}</S.Title>
        </S.Titles>
        <S.Description>{description}</S.Description>
      </S.Content>
      <S.Start as='a' href='#'>
        {`Start `}
        <Chevron
          size={{ width: 15, height: 15 }}
          position='right'
          color='white'
        />
      </S.Start>
    </S.Container>
  )
}

export default InfoCard
