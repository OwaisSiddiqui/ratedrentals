import styled from 'styled-components'

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 590;
  font-size: 16px;
  color: black;
  margin-bottom: 10px;
`

export const CircularDetails = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const CircularDetail = styled.li`
  background: white;
  border: 1px solid #e2e2e2;
  border-radius: 23px;
  padding: 0.3rem 0.6rem;
  text-transform: capitalize;
  white-space: nowrap;
  font-size: 13px;
  font-family: ${({ theme }) => theme.font.family.primary};
  color: black;
`

export const None = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: italic;
  font-weight: 400;
  font-size: 15px;

  letter-spacing: 0.05em;
  color: #c9c9c9;
`
