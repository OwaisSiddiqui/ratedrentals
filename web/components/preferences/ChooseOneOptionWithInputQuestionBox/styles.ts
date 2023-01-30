import styled from 'styled-components'

interface QuestionInputProps {
  isUnitLeft: boolean
}

export const CustomInput = styled.input<QuestionInputProps>`
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font.family.primary};
  -webkit-appearance: none;
  font-weight: 500;
  border: none;
  display: flex;
  width: 5ch;
  font-size: 1rem;
  order: ${({ isUnitLeft }) => (isUnitLeft ? 2 : 1)};
  padding: ${({ isUnitLeft }) =>
    isUnitLeft ? '1rem 1.5rem 1rem 0' : '1rem 0 1rem 1.5rem'};
  &:focus {
    outline: none;
  }
  flex: 1;
`

interface UnitSpanProps {
  isLeft: boolean
}

export const UnitSpan = styled.span<UnitSpanProps>`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: black;
  display: flex;
  order: ${({ isLeft }) => (isLeft ? 1 : 2)};
  padding: ${({ isLeft }) => (isLeft ? '0 0 0 1.5rem' : '0 1.5rem 0 0')};
  font-weight: 500;
  pointer-events: none;
`

export const UnitSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface CustomInputSectionProps {
  show: boolean
}

export const CustomInputSection = styled.div<CustomInputSectionProps>`
  display: flex;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
  overflow: hidden;
  align-items: center;
  gap: 0.2rem;
  position: relative;
  margin-top: 1rem;
  flex: 1;
  /* padding: 0 1rem; */
  width: 100%;
  max-width: 13rem;
`
