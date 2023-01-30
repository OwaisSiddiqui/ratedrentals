import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const MobileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
export const DesktopWrapper = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`
export const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
`
export const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  display: flex;
  @media ${devices.tablet} {
    flex-direction: row;
  }
`

export const Left = styled.div`
  display: flex;
  background: white;
  height: 100%;
  width: 100%;
`

export const Right = styled.div`
  display: flex;
  width: 100%;
  background: transparent;
  /* box-shadow: -10px 0 20px rgb(0, 0, 0, 0.1); */
  position: absolute;
  right: 0;
  z-index: 2;
  height: 100%;
  overflow: hidden;
  padding: 1rem 1rem 1rem 1rem;
  pointer-events: none;
  flex-direction: column;
  @media ${devices.tablet} {
    padding: 1rem 1rem 1rem 1rem;
  }
`

export const RightWrapper = styled.div<{
  isViewMoreDetails: boolean
}>`
  margin-top: auto;
  margin-left: auto;
  width: 100%;
  max-width: 28rem;
  height: ${({ isViewMoreDetails }) => isViewMoreDetails ? '70%' : '30%'};
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0px 5px 9px rgba(0, 0, 0, 0.15);
  border-radius: 7px;
  background: transparent;
  pointer-events: auto;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  overflow: auto;
  @media ${devices.tablet} {
    bottom: none;
    width: 30%;
    height: 100%;
    margin-right: initial;
    overflow: hidden;
  }
`

export const RightChildren = styled.div`
  height: 100%;
  overflow: auto;
`

export const NavigationListingsComponentWrapper = styled.div`
  display: flex;
`

export const Arrows = styled.div`
  position: absolute;
  align-self: center;
  right: 0;
  left: none;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 1rem;
  z-index: 3;
  flex-direction: column;
  @media ${devices.tablet} {
    left: -4.5rem;
  }
`

export const Navigate = styled.button`
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.1);
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 0;
  cursor: pointer;
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
