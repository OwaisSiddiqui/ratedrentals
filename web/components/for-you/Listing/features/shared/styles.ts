import styled from 'styled-components'
export { Title } from '@/components/for-you/Listing/shared/styles'

export const Features = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const Feature = styled.li`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 15px;
  color: black;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
