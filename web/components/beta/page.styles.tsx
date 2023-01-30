import { PrimaryButton, PrimaryTextInput } from '@/components/styles'
import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100%;
  flex: 1;
`

export const Container = styled.main`
  padding: 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  max-width: 35rem;
  align-self: center;
  flex: 1;
`

export const Main = styled.main``

export const MainHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 32px;
  font-weight: 600;
  padding-bottom: 1.5rem;
`

export const Explanation = styled.article`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 25px;
  color: #767676;
`

export const SubcribeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

export const Email = styled(PrimaryTextInput)``

export const SubscribeButton = styled(PrimaryButton)`
  display: flex;
`

interface SubscribeMessage {
  isError: boolean
  isLoading: boolean
}

export const SubscribeMessage = styled.span<SubscribeMessage>`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
  border: 1px solid
    ${({ isError, isLoading }) =>
      isError && !isLoading ? 'red' : isLoading ? 'grey' : 'limegreen'};
  padding: 1rem;
  text-align: center;
  color: ${({ isError, isLoading }) =>
    isError && !isLoading ? 'red' : isLoading ? 'grey' : 'limegreen'};
  flex: 1;
  margin-top: 2rem;
`

export const SubscribeFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const HR = styled.hr`
  background: #e1e1e1;
  display: flex;
  /* flex: 1; */
  height: 1px;
  margin: 0;
  border: none;
`
