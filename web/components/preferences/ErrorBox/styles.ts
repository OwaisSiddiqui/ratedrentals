import styled from 'styled-components'

interface ErrorSectionProps {
  visible: boolean
}

export const ErrorSection = styled.div<ErrorSectionProps>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  color: #ed2644;
  background: white;
  padding: 2rem;
  display: flex;
  border: 1px solid #ed2644;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
  flex-direction: column;
  z-index: 50000;
`

export const ErrorContent = styled.div``

export const ErrorTitleSection = styled.div``

export const ErrorTitle = styled.span``

export const ErrorUL = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
`

export const ErrorLI = styled.li`
  font-weight: 500;
  margin-left: 0.8rem;
`

export const ErrorULSection = styled.div``

export const CloseButtonSection = styled.div``

export const CloseButton = styled.button`
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`

export const ErrorButton = styled.button`
  &:first-letter {
    text-transform: capitalize;
  }
  background: white;
  border: none;
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.font.family.primary};
  text-decoration: underline;
  color: #ed2644;
  font-weight: 600;
  cursor: pointer;
`

export const Close = styled.button`
  background: white;
  border: none;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  padding: 1rem;
  cursor: pointer;
`
