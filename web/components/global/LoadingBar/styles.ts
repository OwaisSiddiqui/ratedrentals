import styled from 'styled-components'

export const Progress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999;
  height: 3px;
  width: 100%;
`

export const Indicator = styled.div<{
  progress: number
  opacity: number
}>`
  width: ${({ progress }) => `${progress}%`};
  background: linear-gradient(104.71deg, #00e691 15.77%, #04d7ca 82.36%);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999999999;
  transition: all 0.1s linear, opacity 0.3s linear 0.2s;
  opacity: ${({ opacity }) => opacity};
`

export const LoaderWrapper = styled.div<{
  opacity: number
}>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 999999999;
  transition: all 0.1s linear, opacity 0.3s linear 0.2s;
  display: ${({ opacity }) => (opacity === 0 ? 'none' : 'block')};
`
