import styled, { keyframes } from 'styled-components'
import { pulse } from '../../styles'

export const HiddenContent = styled.div`
  visibility: hidden;
  max-height: min-content;
  white-space: nowrap;
`

export const Container = styled.div<{
  size?: {
    width: string
    height: string
  }
  color?: string
}>`
  width: ${({ size }) => (size ? size.width : 'auto')};
  height: ${({ size }) => (size ? size.height : 'auto')}; */
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 999px;
  background: ${({ color }) => color};
  float: left;
`
