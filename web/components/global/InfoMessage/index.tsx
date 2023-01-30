import Info from '../icons/Info'
import * as S from './styles'

const InfoMessage = ({ description }: { description: string }) => {
  return (
    <S.Container>
      <Info size={{ width: 25, height: 25 }} color='black' />
      <S.Description>{description}</S.Description>
    </S.Container>
  )
}

export default InfoMessage
