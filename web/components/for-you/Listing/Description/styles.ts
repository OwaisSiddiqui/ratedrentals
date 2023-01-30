import styled from 'styled-components'

export const Description = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 400;
  font-size: 15px;
  line-height: 23px;
  color: #000000;
  overflow-wrap: break-word;
  overflow: hidden;
  max-height: 10rem;
`

export const ShowMoreSection = styled.button`
  display: flex;
  background: transparent;
  align-self: flex-start;
  border: none;
  font-family: ${({ theme }) => theme.font.family.primary};
  margin: 0;
  padding: 0;
  text-decoration-line: underline;
  color: grey;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
`

export const ShowMore = styled.span`
  color: grey;
`

export const Container = styled.section<{
  isOverflown: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ isOverflown }) => (isOverflown ? '1rem' : null)};
  flex-shrink: 0;
`
