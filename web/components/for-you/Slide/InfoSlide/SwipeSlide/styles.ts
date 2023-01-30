import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 0 1.5rem;
  height: 100%;
  width: 100%;
  padding-top: 10rem;
  background: white;
`

export const Title = styled.h1`
  font-size: 23px;
  color: black;
  line-height: 35px;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
`

export const Description = styled.p`
  font-size: 16px;
  color: #838383;
  line-height: 25px;
  font-family: ${({ theme }) => theme.font.family.primary};
`
