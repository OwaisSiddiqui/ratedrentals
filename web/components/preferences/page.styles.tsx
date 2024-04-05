import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  flex: 1;
  background-image: url('./images/bedroom.jpg');
  background-repeat: no-repeat;
  background-position: 30% 0%;
  background-size: cover;
  @media ${devices.tablet} {
    background-position: 100% 0%;
  }
`

export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: medium;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex: 0 1 auto;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem 0;
  background: white;
`

export const SkipLink = styled.a`
  color: black;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 13px;
  display: flex;
  color: #828282;
  padding: 1rem 0;
  background: #fbfbfb;
  align-items: center;
  justify-content: center;
`

export const ChangeCity = styled.a`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: #a3a3a3;
  border-bottom: 1px solid #a3a3a3;
  text-decoration: none;
  font-size: 12px;
`

export const ChoosenCity = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 13px;
  display: flex;
  color: #a3a3a3;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background: white;
`

export const ChoosenCityName = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  background: white;
  border-radius: 7px;
  display: flex;
  gap: 5px;
  align-items: center;
  background: #fbfbfb;
  padding: 0.5rem;
`
