import { Listing } from 'ratedrentals-types'
import { CircularDetails, Title } from '../shared/index'
import * as S from './styles'

const UtilitiesIncluded = ({
  utilities,
}: {
  utilities: Listing['property']['legal']['utilities']
}) => {
  return (
    <S.Container>
      <Title>Included Utilities</Title>
      <CircularDetails
        details={utilities.map(utility => {
          return utility
        })}
      />
    </S.Container>
  )
}

export default UtilitiesIncluded
