import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  z-index: 1;
`

export const DesktopContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
`

export const Arrows = styled.div`
  position: fixed;
  right: 1rem;
  align-items: center;
  top: 37.5%;
  transform: translateY(-50%);
  justify-content: center;
  gap: 0.5rem;
  flex-direction: column;
  z-index: 2;
  display: flex;
  @media ${devices.tablet} {
    top: 50%;
    transform: translateY(-50%);
    right: calc((100% - 2rem) * 0.3 + 2rem);
  }
`

export const Navigate = styled.button`
  border-radius: 7px;
  background: transparent;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 0;
  cursor: pointer;
  /* backdrop-filter: blur(10px); */
  padding: 0;
  margin: 0;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const PrevNext = styled.div`
  display: flex;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 800;
  border-radius: 0 0 7px 7px;
  overflow: hidden;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  background: white;
  align-self: flex-end;
  padding: 0.5rem 1rem;
  flex-shrink: 0;
  border-top: 1px solid lightgrey;
`

export const Prev = styled.button`
  background: white;
  border: 1px solid lightgrey;
  padding: 0;
  /* flex: 1; */
  width: 4rem;
  height: 2rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #fafafa;
  }
`

export const Next = styled(Prev)`
  flex: 1;
`