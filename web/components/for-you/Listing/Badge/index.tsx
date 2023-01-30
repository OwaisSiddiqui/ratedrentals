import { Badges } from 'ratedrentals-types'
import * as S from './styles'

export const Badge = ({ badge }: { badge: Badges[number] }) => {
  return (
    <S.Container color={badge['colors']['background']}>
      <S.Name color={badge['colors']['text']}>{badge['name']}</S.Name>
    </S.Container>
  )
}

export default Badge
