import { None } from '../../shared'
import * as S from './styles'

interface FeaturesProps {
  title: string
  features: string[]
}

const Features = ({ title, features }: FeaturesProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {features.length > 0 ? (
        <S.Features>
          {features.map((feature, index) => {
            return <S.Feature key={index}>{feature}</S.Feature>
          })}
        </S.Features>
      ) : (
        <None />
      )}
    </S.Container>
  )
}

export default Features
