import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  align-items: stretch;
  justify-content: space-between;
`

interface FooterProps {
  show: boolean
}

export const Footer = styled.div<FooterProps>`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  max-width: 40rem;
`

export const FormWrapper = styled.div`
  align-self: center;
  width: 100%;
  padding: 2rem;
  max-width: 35rem;
  position: relative;
`
