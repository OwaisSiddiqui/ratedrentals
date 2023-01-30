import styled, { keyframes, css } from 'styled-components'

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.hex};
  border: none;
  border-radius: 5px;
  padding: 0.9rem 1.5rem;
  color: white;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family.primary};
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  &:hover {
    box-shadow: ${({ theme }) =>
      `0px 0px 0px 6px rgb(${theme.colors.primary.rgb.r}, ${theme.colors.primary.rgb.g}, ${theme.colors.primary.rgb.b}, 0.1)`};
  }
  text-align: center;
  font-size: 1rem;
`

export const PrimaryButtonInverted = styled(PrimaryButton)`
  background: white;
  color: ${({ theme }) => theme.colors.primary.hex};
  border: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
`

export const PrimaryDescription = styled.p`
  color: #e2e2e2;
  font-size: 14px;
  line-height: 18px;
`

export const PrimaryTextInput = styled.input`
  padding: 1rem 1.5rem;
  -webkit-appearance: none;
  border-radius: 0;
  font-family: ${({ theme }) => theme.font.family.primary};
  background: #f7f7f7;
  border-radius: 7px;
  border: none;
  &:hover {
    box-shadow: ${({ theme }) =>
      `0px 0px 0px 6px rgb(${theme.colors.primary.rgb.r}, ${theme.colors.primary.rgb.g}, ${theme.colors.primary.rgb.b}, 0.1)`};
  }
  font-size: 1rem;
  border: 1px solid lightgray;
`

export const pulse = keyframes`
0%, 100% {
  opacity: 1;
}
50% {
  opacity: .5;
}
`

export const loadingAnimation = css`
  ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
`
