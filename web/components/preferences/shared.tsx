import styled from 'styled-components'

export const QuestionSpan = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 500;
  display: block;
  padding: 2rem 2rem 2rem 2rem;

  text-align: center;
`

export const QuestionType = styled.span`
  color: ${({ theme }) => theme.colors.primary.hex};
`

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  align-items: center;
  padding: 0 1rem;
  background: white;
  padding: 2rem;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
`

export const OptionsSectionWrapper = styled.div`
  padding: 0 2rem;
`

export const OptionsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  box-sizing: border-box;
  max-width: 100%;
  justify-content: center;
`

interface OptionButtonProps {
  isSelected: boolean
}

export const OptionButton = styled.button<OptionButtonProps>`
  font-family: ${({ theme }) => theme.font.family.primary};
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary.hex : 'white'};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
  cursor: pointer;
  padding: 1rem 2rem;
  font-weight: 500;
  box-shadow: ${({ isSelected }) =>
    isSelected ? 'none' : '0px 9px 18px rgba(0, 0, 0, 0.04)'};
  &:hover {
    background: ${({ isSelected }) => (isSelected ? null : '#FCFCFC')};
  }
  font-size: 1rem;
`

interface QuestionComponentProps {
  question: string
  category: string
}

export const QuestionComponent = ({
  question,
  category,
}: QuestionComponentProps) => {
  return (
    <QuestionSpan>
      {question.slice(0, question.indexOf(category))}
      <QuestionType>{category}</QuestionType>
      {` ${question.slice(question.indexOf(category) + category.length + 1)}`}
    </QuestionSpan>
  )
}
