import { devices } from '@/utils/constants'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  width: 100%;
  height: calc(100% - 5rem);
  flex: 1;
  overflow: hidden;
  flex-direction: row;
  position: absolute;
  z-index: 2;
`

export const Viewer = styled.div`
  height: 100%;
  height: 100%;
  display: flex;
  flex: 1;
`

export const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  scroll-snap-type: x mandatory;
  flex-direction: row;
  display: flex;
`

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  scroll-snap-align: start;
  overflow-y: hidden;
`

export const Tour3dIFrame = styled.iframe`
  width: 100%;
  height: 100%;
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

export const Arrows = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  align-self: center;
  bottom: 1rem;
  left: 50%;
  translate: -50% 0;
  @media ${devices.tablet} {
    bottom: 1rem;
    left: 50%;
    translate: -50% 0;
  }
`

export const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media ${devices.tablet} {
    
  }
`

export const Navigate = styled.button`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 0;
  cursor: pointer;
  backdrop-filter: blur(10px);
  padding: 0;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const TourNumber = styled.div`
  color: #f2f2f2;
  background: rgba(0, 0, 0, 0.1);
  padding: 3px;
  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 1rem;
  left: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 5px;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 12px;
`
