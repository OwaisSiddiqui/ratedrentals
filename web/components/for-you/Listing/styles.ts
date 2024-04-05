import { devices } from '@/utils/constants'
import styled from 'styled-components'

const footerHeight = '5rem'

export const Section = styled.section`
  padding: 20px;
  /* background: linear-gradient(
      127.58deg,
      #fdfdfd 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #ffffff; */
  background: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
`

export const ThreeDotsMenuButton = styled.button`
  position: absolute;
  right: 0rem;
  display: flex;
  height: 100%;
  width: 3rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`

export const ThreeDotsMenuItems = styled.ul`
  display: flex;
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  height: 4rem;
  width: 7rem;
  border-radius: 7px;
`

export const DesktopContainer = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  color: white;
  flex-direction: column;
  /* background: white; */
  border-radius: 7px;
  display: flex;
`

export const TopImageCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 7px 7px 0 0;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2.5rem;
    z-index: 2;
    background: linear-gradient(
      255.47deg,
      rgba(255, 255, 255, 0) -194.32%,
      #ffffff 42.67%
    );
  }
`

export const InListingPhoto = styled.div`
  display: flex;
  height: 10rem;
  width: 100%;
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  background: transparent;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`

export const GoogleMapWrapper = styled.div`
  display: flex;
  height: calc(100% - 4rem);
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
`

export const Top = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionDivider = styled.hr`
  height: 1px;
  background: #e4e4e4;
  display: flex;
  border: none;
  margin: 0 1.5rem;
`

export const MobileSections = styled.main`
  display: flex;
  flex: 1;
  gap: 0.5rem;
  flex-direction: column;
  height: auto;
  padding: 20px;
  background: #eaeaea;
  align-items: flex-end;
`

export const DesktopSections = styled.main`
  display: flex;
  flex: 1;
  gap: 0.5rem;
  flex-direction: column;
  height: auto;
  padding: 20px;
  
`

export const DesktopBottom = styled.div<{
  background: string
  show: boolean
}>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  flex-direction: column;
  /* height: 100%; */
  overflow: auto;
  /* background-image: ${({ background }) => `url(${background})`}; */
  backdrop-filter: blur(50px);
  background-color: rgba(255, 255, 255, 0.7);
  background-size: 5rem auto;
  flex: 1;
  scrollbar-gutter: stable;
  background: #fafafa;
  @media ${devices.tablet} {
    display: flex;
  }
`

export const ViewMoreDetails = styled.button<{
  show: boolean
}>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 0.5rem 0;
  border: none;
  background: white;
  cursor: pointer;
  &:hover {
    background: #eaeaea;
  }
  @media ${devices.tablet} {
    display: none;
  }
`

export const NavigationListingsComponentWrapper = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
`

export const TopAddress = styled.div`
  height: 2.5rem;
  font-size: 15px;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 700;
  color: black;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  padding: 0 1rem;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  border-radius: 7px 7px 0 0;
`

export const TopAddressText = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`

export const MainContent = styled.main`
  width: 100%;
`

export const NotAvailableSection = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
  justify-content: center;
  height: 2rem;
  background: white;
  color: black;
  justify-content: center;
  position: sticky;
  top: 0;
  flex: 0 0 auto;
  border-radius: 0;
  border-bottom: 1px solid lightgray;
`

export const MainDetailsSection = styled.div<{
  isBottomOpen: boolean
}>`
  height: ${({ isBottomOpen }) => (isBottomOpen ? 'auto' : '5rem')};
  /* overflow: hidden; */
  padding: ${({ isBottomOpen }) =>
    isBottomOpen
      ? '0.7rem 1.5rem 1.7rem 1.5rem'
      : '0.7rem 1.5rem 0.7rem 1.5rem'};
  position: sticky;
  z-index: 2;
  background: white;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  box-shadow: 0 -7px 13px rgba(0, 0, 0, 0.1);
`

export const TopSticky = styled.div`
  top: 0;
  position: relative;
  border-bottom: 1px solid lightgrey;
  border-radius: 7px 7px 0 0;
`

export const NotAvailable = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: black;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  gap: 0.3rem;
`

export const MobileWrapper = styled.div`
  display: flex;
`

export const DesktopWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
`

export const MobileContainer = styled.div`
  width: 100%;
  position: relative;
  color: black;
`

export const PhotoViewerWrapper = styled.div`
  margin-bottom: 1.5rem;
`

export const AdWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
`

export const TopImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.family.primary};
  text-transform: capitalize;
  color: rgba(151, 151, 151, 1);
`

export const AvailableSymbol = styled.div`
  border-radius: 50%;
  background: rgba(0, 255, 10, 1);
  box-shadow: 0 0 0 2px rgba(0, 255, 10, 0.2);
  width: 0.4rem;
  height: 0.4rem;
`

export const TopTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

export const AvailableSection = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const AvailableText = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: rgba(121, 121, 121, 1);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const DesktopMainDetailsSection = styled(MainDetailsSection)`
  height: 8rem;
  box-shadow: none;
  border-radius: 0;
`