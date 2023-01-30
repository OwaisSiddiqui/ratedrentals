import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const Background = styled.a`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  @media ${devices.desktop} {
    justify-content: center;
    align-items: center;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background: white;
  padding: 2rem;
  gap: 2rem;
  flex: 1;
  @media ${devices.desktop} {
    border-radius: 10px;
  }
`

export const MarginWrapper = styled.div`
  margin-top: 20rem;
  @media ${devices.desktop} {
    margin-top: initial;
  }
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const Description = styled.p`
  font-size: 13px;
  color: #949494;
  line-height: 17px;
`

export const AvailableCities = styled.ul`
  padding: 0;
  margin: 0;
`

export const AvailableCityLi = styled.li`
  padding: 0;
  margin: 0;
`

export const AvailableCity = styled.a`
  color: black;
  display: flex;
  border: 1px solid #fafafa;
  padding: 1rem;
`
