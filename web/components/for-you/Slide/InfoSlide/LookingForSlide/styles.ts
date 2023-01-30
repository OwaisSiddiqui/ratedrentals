import { PrimaryButton } from '@/components/styles'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: space-between; */
  /* justify-content: space-between; */
  flex: 1;
  justify-content: space-between;

`

export const GetStarted = styled(PrimaryButton)`
  gap: 0.1rem;
  margin-top: 2rem;
`
