import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`

export const Container = styled.svg`
  animation: ${spin} 1s linear infinite;
`
