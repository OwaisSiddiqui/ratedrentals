import styled from 'styled-components'
import { PrimaryButton, PrimaryTextInput } from '../../styles'

export const FormComponent = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface FormFormProps {
  show: boolean
}

export const FormForm = styled.form<FormFormProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  flex: 1;
`

export const Title = styled.h1`
  font-weight: 600;
  padding-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 32px;
`

export const InputSectionLabel = styled.label`
  padding-bottom: 0.5rem;
  display: none;
`

export const InputInput = styled(PrimaryTextInput)`
  margin-bottom: 1.7rem;
`

export const MessageTextarea = styled(InputInput)`
  display: flex;
  resize: none;
  height: 10rem;
`

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

interface FeedBackMessageProps {
  show: boolean
}

export const FeedBackMessage = styled.p<FeedBackMessageProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const SubmitButton = styled(PrimaryButton)`
  flex: 1;
`
