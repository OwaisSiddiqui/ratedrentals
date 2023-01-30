import styled from 'styled-components'
import { devices } from '@/utils/constants'

export const MobileWrapper = styled.div`
  width: 100%;
  height: 100%;
  @media ${devices.desktop} {
    display: none;
  }
`
export const DesktopWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`
export const MobileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  flex-shrink: 0;
`
export const DesktopContainer = styled.div<{
  isViewMoreDetails: boolean
}>`
  height: ${({ isViewMoreDetails }) => isViewMoreDetails ? 'calc((100% - 2rem) * 0.3 + 1rem)' : 'calc((100% - 2rem) * 0.7 + 1rem)'};
  width: 100%;
  overflow: auto;
  flex-direction: column;
  display: flex;
  /* flex: 1; */
  background: transparent;
  position: absolute;
  z-index: 2;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${devices.tablet} {
    width: calc((100% - 2rem) * 0.7 + 1rem);
    height: 100%;
    /* &:hover {
      content: '';
      cursor: default;
    } */
  }
  ${({ isViewMoreDetails }) => isViewMoreDetails ? `&:hover {
    opacity: ${isViewMoreDetails ? '0.7' : '1'};
    &::after {
      content: 'View photos';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 23px;
      font-weight: 600;
      cursor: pointer;
    }
  }` : null}
`

export const Arrows = styled.div<{
  isViewMoreDetails: boolean
}>`
  position: fixed;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
  z-index: 10;
  right: 1rem;
  top: ${({ isViewMoreDetails }) => isViewMoreDetails ? 'calc(((100% - 2rem) * 0.3 + 1rem) / 2)' : 'calc(((100% - 2rem) * 0.7 + 1rem) / 2)'};
  translate: 0 -50%;
  @media ${devices.tablet} {
    top: 50%;
    right: calc((100% - 2rem) * 0.3 + 3rem);
    translate: 0 -50%;
  }
`

export const Navigate = styled.button`
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 0;
  cursor: pointer;
  backdrop-filter: blur(10px);
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  /* border-top: 1px solid rgba(0, 0, 0, 0.1); */
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const Cover = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 3;
  scroll-snap-align: center;
  background: transparent;
  @media ${devices.tablet} {
    height: 100%;
    width: 100%;
  }
`

export const CoverWrapper = styled.div<{
  background: string
  show: boolean
  size: {
    width: string
    height: string
  }
}>`
  height: 100%;
  width: 100%;
  padding: 1rem;
  &::after {
    display: ${({ show }) => show ? 'flex' : 'none'};
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

  }
`

export const DesktopSlideContainer = styled.div<{
  show: boolean
}>`
  width: 100%;
  height: 90%;
  flex-shrink: 0;
  backround: transparent;
`

export const MoveWrapper = styled.div`
  position: absolute;
  right: 1rem;
  bottom: calc(1.3rem + 1rem);
  z-index: 5000;
`

export const PhotoArrow = styled.button<{
  position: 'left' | 'right'
}>`
  height: 100%;
  left: ${({ position }) => (position === 'right' ? 'auto' : '0')};
  right: ${({ position }) => (position === 'right' ? '0' : 'auto')};
  visbility: hidden;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
  flex: 1;
  justify-content: ${({ position }) =>
    position === 'right' ? 'flex-end' : 'flex-start'};
  padding-left: ${({ position }) => (position === 'right' ? '0' : '1rem')};
  padding-right: ${({ position }) => (position === 'right' ? '1rem' : '0')};
  &:hover {
    opacity: 1;
  }
`

export const PhotoArrows = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
`

export const Wrapper = styled.div`
  /* flex: 1; */
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  flex-direction: row;
  display: flex;
  height: 100%;
  /* scrollbar-gutter: stable; */
  flex: 1 0 auto;
  /* gap: 1rem; */
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  overflow-y: hidden;
`

export const Viewer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`

export const PhotoNumber = styled.div`
  color: #f2f2f2;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px;
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: calc(0.7rem + 0.5rem + 1.5rem + 0.5rem);
  left: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 5px;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 12px;
`
