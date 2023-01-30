import styled from 'styled-components'
export { Title } from '../shared'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
`

export const PromotionTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
  font-size: 17px;
`

export const PromotionDescription = styled.p`
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const Promotion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 5px solid hsl(50, 100%, 50%);
  background: hsl(50, 100%, 90%);
  padding: 1rem;
`

export const Promotions = styled.div`
  gap: 2.5rem;
  display: flex;
  flex-direction: column;
`
