import styled from 'styled-components'
export { Title } from '@/components/for-you/Listing/shared/styles'

export const Details = styled.ul``

export const Detail = styled.span`
  font-weight: 500;
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 15px;
`

export const DetailSection = styled.li`
  color: black;
  display: flex;
  justify-content: space-between;
  background: rgba(171, 171, 171, 0.1);
  padding: 0.7rem 1rem;
  border-radius: 5px;
  &:nth-child(even) {
    background: white;
  }
`

export const DetailCategory = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 15px;
`
