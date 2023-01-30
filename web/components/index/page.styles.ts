import styled from 'styled-components'
import { devices } from '@/utils/constants'

export const MainTitleSection = styled.header`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.font.family.primary};
  position: relative;
  align-items: center;
  margin-top: 0rem;
  padding: 0rem 1.9rem;
  align-self: flex-start;
  gap: 2rem;
  @media ${devices.desktop} {
    max-width: 30rem;
  }
`

export const MainHeading = styled.h1`
  font-weight: 600;
  font-size: 2.3rem;
  color: black;
  line-height: 1.5;
  @media ${devices.desktopS} {
    font-size: 2.5rem;
  }
  @media ${devices.tabletS} {
    font-size: 2.7rem;
  }
  @media ${devices.tablet} {
    font-size: 2.9rem;
  }
  @media ${devices.desktopS} {
    font-size: 3rem;
  }
`

export const MainSubHeading = styled.h2`
  font-size: 25px;
  font-weight: 600;
  color: black;
  line-height: 1.7;
  @media ${devices.desktop} {
    font-size: 2rem;
  }
`

export const CardsSection = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 70rem;
  padding: 0 1rem;
  @media ${devices.tabletS} {
    flex-direction: row;
    min-height: 30rem;
    gap: 2rem;
  }
`

export const Layout = styled.div``

export const HeadingsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  margin-top: 6rem;
  @media ${devices.desktop} {
    margin-top: 5.5rem;
    gap: 1rem;
  }
`

export const HeroImage = styled.section`
  display: flex;
  height: 28rem;
  background-image: url('./images/toronto-skyline-gradient.svg');
  background-repeat: no-repeat;
  background-position: 36% bottom;
  background-size: 160%;
  position: relative;
  justify-content: center;
  @media ${devices.mobile} {
    background-size: 140%;
    background-position: 33% 60%;
    height: 43rem;
  }
  @media ${devices.tabletS} {
    height: 48rem;
  }
  @media ${devices.tablet} {
    background-size: 130%;
    height: 48rem;
  }
  @media ${devices.desktopS} {
    background-size: 115%;
    background-position: 33% 50%;
    height: 48rem;
  }
  @media ${devices.desktop} {
    background-size: 100%;
    background-position: 0 70%;
    height: 40rem;
  }
`

export const InBetaSection = styled.article`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  background-color: #fbfbfb;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 0.7rem;
  color: #828282;
  gap: 0.7rem;
  align-self: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  flex-grow: 1;
  width: 100%;
  z-index: 1;
`

export const LearnMore = styled.a`
  color: #828282;
  display: flex;
  align-items: center;
`

export const MainContentHeading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 16rem;
  gap: 1rem;
  max-width: 40rem;
  padding: 0 2.5rem;
  font-family: ${({ theme }) => theme.font.family.primary};
  @media ${devices.tabletS} {
    height: 13rem;
    max-width: 30rem;
  }
`

export const MainContentTitle = styled.h2`
  font-size: 23px;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
`

export const MainContentDescription = styled.p`
  font-weight: 300;
  color: #7d7d7d;
  line-height: 27px;
  font-size: 1rem;
  text-align: center;
`

export const MainContentSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 3rem;
`
