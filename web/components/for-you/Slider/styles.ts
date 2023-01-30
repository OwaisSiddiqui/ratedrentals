import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
`

export const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  scroll-snap-type: y mandatory;
  flex-direction: column;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Arrows = styled.div`
  position: fixed;
  right: 1rem;
  align-items: center;
  top: 37.5%;
  transform: translateY(-50%);
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
  z-index: 2;
  display: flex;
  @media ${devices.tablet} {
    top: 50%;
    transform: translateY(-50%);
    right: calc(30% + 2rem);
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
  backdrop-filter: blur(10px);
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`
