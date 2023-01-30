import { Listing } from 'ratedrentals-types'
import * as S from './styles'

const Promotions = ({ promotions }: { promotions: Listing['promotions'] }) => {
  return (
    <S.Container>
      <S.Title>Promotions</S.Title>
      <S.Promotions>
        {promotions.map((promotion, i) => {
          return (
            <S.Promotion key={i}>
              <S.PromotionTitle>{promotion.title}</S.PromotionTitle>
              <S.PromotionDescription
                dangerouslySetInnerHTML={{
                  __html: promotion.description ?? '',
                }}
              ></S.PromotionDescription>
            </S.Promotion>
          )
        })}
      </S.Promotions>
    </S.Container>
  )
}

export default Promotions
