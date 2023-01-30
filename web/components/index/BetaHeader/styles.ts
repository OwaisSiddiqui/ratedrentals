import styled from 'styled-components'

export const Container = styled.div<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 5px;
  background: #fbfbfb;
  color: #828282;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 9999;
`

export const LearnMore = styled.a`
  display: flex;
  gap: 2px;
  font-family: ${({ theme }) => theme.font.family.primary};
  align-items: center;
  border-bottom: 1px solid #828282;
  color: #828282;
  text-decoration: none;
`

export const Description = styled.p`
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const CloseWrapper = styled.div`
  position: absolute;
  left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
