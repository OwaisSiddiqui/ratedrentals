import styled from 'styled-components'

export const Container = styled.div<{
  isTouchDevice: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 3rem 2rem 3rem 2rem;
  width: 100%;
  padding-top: ${({ isTouchDevice }) => !isTouchDevice ? 'auto' : '10rem'};
  padding-bottom: ${({ isTouchDevice }) => !isTouchDevice ? 'auto' : '2rem'};
  background: white;
  flex: 1;
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
