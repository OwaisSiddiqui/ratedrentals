import { PrimaryButton } from '@/components/styles'
import styled from 'styled-components'

export const Container = styled.div<{
  show: boolean
}>`
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 100%;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  z-index: 10;
  background: white;
  gap: 2rem;
  align-items: center;
  padding: 3rem;
`

export const Heading = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  max-width: 30rem;
`

export const Title = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 17px;
  font-weight: 500;
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.font.family.primary};

  color: #7d7d7d;
`

export const Next = styled(PrimaryButton)``
