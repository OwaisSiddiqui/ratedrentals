import { PrimaryButton } from '@/components/styles'
import styled from 'styled-components'

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  position: fixed;
  flex: 1;
  z-index: 9999;
  top: 0;
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 2rem; */
  gap: 2rem;
  flex: 1;
  border-radius: 10px 10px 0 0;
  position: relative;
  background: white;
`

export const MarginWrapper = styled.div`
  margin-top: 40%;
  width: 100%;
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

export const FindMatches = styled(PrimaryButton)`
  width: 100%;
`

export const PreferencesForm = styled.form``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  flex: 1;
  border-radius: 10px 10px 0 0;
  align-items: center;
`

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e2e2e2;
`

export const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 40rem;
  max-width: 40rem;
  background: white;
  overflow: auto;
  align-self: center;
  border-radius: 7px;
  pointer-events: auto;
`


export const ChangeCity = styled.button`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: #a3a3a3;
  
  text-decoration: none;
  font-size: 12px;
  padding: 0;
  background: transparent;
  margin: 0;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  position: relative;
`

export const ChoosenCity = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 13px;
  display: flex;
  color: #a3a3a3;
  align-items: center;
  justify-content: center;
  gap: 3rem;
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

export const ChooseNewCityCard = styled.div<{
  show: boolean
}>`
  position: absolute;
  display: flex;
  padding: 1rem;
  top: calc(100% + 0.5rem);
  left: 0;
  display: ${({ show }) => show ? 'flex' : 'none'};
  width: 12rem;
  height: 15rem;
  z-index: 5;
  overflow: auto;
  background: white;
  border-radius: 4px;
  flex-direction: column;
  text-align: left;
  gap: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  cursor: default;
`

export const ChooseNewCityCardHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

export const ChooseNewCityCardTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: black;
`

export const ChooseNewCityCardSubTitle = styled.h2`
  font-size: 12px;
`

export const ChooseNewCityCardCityList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ChooseNewCityCardCityLi = styled.li`
  
`

export const ChooseNewCityCardCityButton = styled.button`
  background: white;
  border: 1px solid lightgrey;
  padding: 0.5rem;
  cursor: pointer;
`