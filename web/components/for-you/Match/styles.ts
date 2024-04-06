import { devices } from '@/utils/constants'
import styled, { css } from 'styled-components'
import { loadingAnimation, PrimaryButton, pulse } from '@/components/styles'

export const Section = styled.section``

export const SectionDivider = styled.hr`
  height: 1px;
  background: #e4e4e4;
  display: flex;
  border: none;
  width: 100%;
  margin: 0;
`

export const Bottom = styled.div<{
  open: boolean
}>`
  display: flex;
  position: absolute;
  top: ${({ open }) => (open ? '0' : 'initial')};
  bottom: ${({ open }) => (open ? 'initial' : '0')};
  width: 100%;
  z-index: 4;
  height: 100%;
  background: ${({ open }) => (open ? 'rgba(0, 0, 0, 0.35)' : 'transparent')};
  overflow-y: scroll;
  overscroll-behavior: contain;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  -webkit-appearance: none;
`

export const ListingWrapper = styled.div<{
  open: boolean
}>`
  margin-top: ${({ open }) => (open ? '10rem' : 'auto')};
  background: ${({ open }) => (open ? 'white' : 'white')};
  pointer-events: auto;
  background: transparent;
  width: 100%;
`

export const PhotoViewerWrapper = styled.div`
  display: flex;
  height: calc(100% - 5rem + 0.7rem);
  flex-shrink: 0;
  align-items: flex-start;
`

export const ListingUrl = styled.a`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  text-decoration: none;
  color: initial;
  position: absolute;
  height: 100%;
  width: 100%;
  text-decoration: none;
  color: initial;
`

export const Footer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  height: 5rem;
  position: sticky;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 1rem;
`

export const DesktopPhotoViewer = styled.div`
  display: flex;
  /* flex: 1; */
  flex-shrink: 0;
  flex: 1 0 70%;
`

export const Tour3d = styled.div<{
  isLoading: boolean
  show: boolean
}>`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: calc(100% - 8rem);
  display: ${({ show }) => (show ? 'block' : 'none')};
  background: #e2e2e2;
  animation: ${({ isLoading }) => (isLoading ? loadingAnimation : '')};
`

export const CurrentTour = styled.span<{
  show: boolean
}>`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 13px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  color: rgb(0, 122, 255);
  align-self: center;
`

export const Tours = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  bottom: 9rem;
  left: 0;
  width: 100%;
  z-index: 999999;
  padding: 0 1rem;
  overflow: hidden;
`

export const ToursWrapper = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
`

export const SelectTour = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: white;
  font-size: 11px;
  text-align: left;
  padding: 5px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  color: darkgray;
`

export const Tour = styled.button<{
  isSelected: boolean
}>`
  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }
  padding: 7px;
  font-family: ${({ theme }) => theme.font.family.primary};
  color: white;
  font-size: 11px;
  color: ${({ isSelected }) => (isSelected ? 'blue' : 'white')};
  border: none;
  margin: 0;
  background: transparent;
  flex: 1;
  height: 2rem;
`

export const Contact = styled(PrimaryButton)`
  flex: 1;
  padding: 0;
  border: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
`

export const Icons = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const DesktopIcons = styled(Icons)``

export const IconWrapper = styled.button<{
  color: string
}>`
  display: flex;
  padding: 5px;
  align-self: flex-start;
  align-items: center;
  border-radius: 3px;
  justify-content: center;
  background: ${({ color }) => color};
  margin: 0;
  &:disabled {
    opacity: 0.3;
  }
  border: none;
  gap: 0.5rem;
  &:hover {
    background: #fafafa;
  }
`

export const DesktopLeftIconWrapper = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  color: black;
`

export const DesktopGoogleMapContianer = styled.div`
  padding: 1rem;
  position: absolute;
  z-index: 5;
  pointer-events: none;
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 3;
  @media ${devices.tablet} {
    left: 0;
    height: 100%;
    width: 100%;
  }
`

export const DesktopGoogleMapWrapper = styled.div<{
  show: boolean
  isLoading: boolean
}>`
  pointer-events: auto;
  border-radius: 7px;
  overflow: hidden;
  width: 100%;
  height: 70%;
  @media ${devices.tablet} {
    width: calc(70% - 1rem);
    height: 100%;
    
  }
`

export const DesktopTourViewerContainer = styled(DesktopGoogleMapContianer)`
`

export const DesktopTourViewerWrapper = styled(DesktopGoogleMapWrapper)``

export const DesktopIconWrapper = styled(IconWrapper)`
  cursor: pointer;
`

const headerHeight = '2.5rem'

export const HeaderWrapper = styled.div`
  height: 15rem;
  /* background: linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 56.77%); */
  display: flex;
  justify-content: center;
`

export const GoogleMapWrapper = styled.div<{
  show: boolean
  isLoading: boolean
}>`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: calc(100% - 5rem);
  display: ${({ show }) => (show ? 'block' : 'none')};
  background: #e2e2e2;
  animation: ${({ isLoading }) => (isLoading ? loadingAnimation : '')};
`

export const HeaderIcon = styled.div<{
  show: boolean
}>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'initial' : 'none')};
  align-self: flex-start;
  pointer-events: auto;
  padding: 1.5rem;
`

export const CurrentPhoto = styled(CurrentTour)``

export const HeaderTitle = styled.h1`
  padding-top: 1.5rem;
`

export const Sidebar = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 0.5rem;
  align-self: center;
  z-index: 2;
  bottom: calc(5rem + 2rem);
`

export const DesktopSidebarContainer = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
`

export const DesktopSidebar = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 1rem;
  align-self: center;
  z-index: 3;
  right: calc((100% - 2rem) * 0.3 + 2rem);
  pointer-events: auto;
`

export const ThreeDotsMenuItem = styled.li`
  display: flex;
  height: calc(3.5rem / 2);
  &:not(:last-child) {
    border-bottom: 1px solid lightgrey;
  }
`

export const ThreeDotsIconWrapper = styled.button<{
  isOpen: boolean
}>`
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  opacity: ${({ isOpen }) => isOpen ? '0.4' : '1'};
`

export const ConactButtons = styled.div`
  display: flex;
  flex: 1;
  gap: 0.5rem;
`

export const DesktopContactButton = styled.button`
  border: none;
  background: rgb(0, 122, 255);
  padding: 0;
  flex: 1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  text-decoration: none;
  font-weight: 600;
  /* box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.16); */
`

export const DesktopShareButton = styled(DesktopContactButton)`
  background: #f6f6f6;
  color: black;
  position: relative;
`

export const DesktopShareMenu = styled.div`
  width: 7rem;
  height: 4rem;
  background: red;
`

export const DesktopSaveButton = styled(DesktopContactButton)`
  flex: 0 1 auto;
  width: 2rem;
  color: black;
  background: transparent;
  border: none;
  &:hover {
    background: #fafafa;
    color: initial;
  }
`

export const ThreeDotsMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`

export const ThreeDotsMenuItemButton = styled.button`
  display: flex;
  border: none;
  flex: 1;
  width: 100%;
  background: transparent;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  padding: 0 0 0 0.5rem;
  cursor: pointer;
`

export const ThreeDotsMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0.5rem;
  width: 7.5rem;
  z-index: 5;
  display: flex;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div<{
  isLoading: boolean
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  font-family: ${({ theme }) => theme.font.family.primary};
  position: absolute;
  top: 0;
  gap: 0.5rem;
  color: ${({ isLoading }) => (isLoading ? 'transparent' : 'white')};
  z-index: 2;
  /* align-self: center; */
  font-weight: 600;
  animation: ${({ isLoading }) => (isLoading ? loadingAnimation : '')};
  width: 100%;
  justify-content: space-between;
  text-align: center;
  pointer-events: none;
`

export const ShareButton = styled.button`
  border: none;
  padding: 5px 7px;
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  jusitfy-content: center;
  gap: 0.3rem;
  border-radius: 7px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 11px;
  white-space: nowrap;
  align-self: flex-end;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`

export const ContactButton = styled(ShareButton)`
  text-decoration: none;
  color: white;
`

export const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`

export const SaveButton = styled(ShareButton)``

export const Badges = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  max-height: 5rem;
  overflow-y: auto;
`

export const FirstPhotoBottom = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  bottom: calc(5rem + 1.5rem);
  gap: 2rem;
  z-index: 1;
  position: absolute;
  bottom: calc(5rem + 1rem);
  width: 100%;
  justify-content: space-between;
  padding: 0 4.5rem 0 1rem;
`

export const DesktopWrapper = styled.div`
  display: none;
`

export const DesktopContainer = styled.div<{
  isLoading: boolean
  isSlide: boolean
}>`
  height: 100%;
  width: 100%;
  display: flex;
  position: ${({ isSlide }) => (isSlide ? 'relative' : 'static')};
  flex-direction: column;
  overscroll-behavior: contain;
  background: white;
  animation: ${({ isLoading }) =>
    isLoading
      ? css`
          ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
        `
      : ''};
`

export const MobileWrapper = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
`

export const MobileContainer = styled.div<{
  isLoading: boolean
  isSlide: boolean
}>`
  height: 100%;
  width: 100%;
  position: ${({ isSlide }) => (isSlide ? 'relative' : 'static')};
  flex-direction: column;
  overscroll-behavior: contain;
  background: white;
  animation: ${({ isLoading }) =>
    isLoading
      ? css`
          ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
        `
      : ''};
`
