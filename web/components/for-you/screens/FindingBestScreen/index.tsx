import * as S from './styles'

const FindingBestScreen = () => {
  return (
    <S.LoadingComponent>
      <S.LoadingSection>
        <S.LoadingMessage>
          {`Finding the `}
          <S.ColouredText>best</S.ColouredText>
          {` rental home listings `}
          <S.ColouredText>{`for you`}</S.ColouredText>...
        </S.LoadingMessage>
      </S.LoadingSection>
    </S.LoadingComponent>
  )
}

export default FindingBestScreen
