import { devices } from '@/utils/constants'
import styled from 'styled-components'
import { PrimaryButton } from '../../styles'

export const Container = styled.section`
  background-color: white;
  box-shadow: 0px 7px 17px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.3rem;
  height: 25rem;
  border: 1px solid #dddddd;
  justify-content: space-between;
  align-items: start;
  @media ${devices.tabletS} {
    flex: 1;
    height: auto;
  }
`

export const Content = styled.article`
  font-family: ${({ theme }) => theme.font.family.primary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
`

export const SubTitle = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
  color: #4a4a4a;
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #707070;
`

export const Titles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Start = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
`
