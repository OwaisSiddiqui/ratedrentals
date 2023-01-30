import styled from 'styled-components'

export const LoadingComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 50000;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
`

export const LoadingMessage = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
  font-size: 23px;
  text-align: center;
  color: #000000;
  line-height: 33px;
`

export const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2.5rem;
`

export const ColouredText = styled(LoadingMessage)`
  color: ${({ theme }) => theme.colors.primary.hex};
`

export const ContinueSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`
