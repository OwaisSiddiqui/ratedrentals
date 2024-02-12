import { PrimaryButton, PrimaryButtonInverted } from '@/components/styles'
import styled from 'styled-components'

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 5%;
`

export const MainTitleSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
  padding-bottom: 1rem;
`

export const HR = styled.hr`
  border: 1px solid #ededed;
  margin: 0;
`

export const QuestionsSection = styled.div``

interface QuestionSectionProps {
  isSelected: boolean
}

export const QuestionSection = styled.div<QuestionSectionProps>`
  /* display: ${({ isSelected }) => (isSelected ? 'flex' : 'none')}; */
  flex: 1;
`

export const FormComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* overflow-y: hidden; */
`

export const Container = styled.form`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: center;
`

export const Titles = styled.div``

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: hidden;
`

export const ContinueButton = styled(PrimaryButtonInverted)<{
  show: boolean
}>`
  display: ${({ show }) => (show ? 'initial' : 'none')};
`

export const ViewMatchesButton = styled(PrimaryButton)<{
  show: boolean
}>`
  background: ${({ theme }) => theme.colors.primary.hex};
  color: white;
  display: ${({ show }) => (show ? 'initial' : 'none')};
`

export const ContinueButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.7rem;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.7rem;
  padding: 2rem;
  background: white;
  border-radius: 1rem 1rem 0 0;
`
