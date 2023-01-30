import styled from 'styled-components'
export { Title } from '@/components/for-you/Listing/shared/styles'

export const Address = styled.address`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 12px;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  vertical-align: text-top;
`

export const AddressSection = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-start;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const IconWrapper = styled.div`
  display: flex;
  height: 15px;
  align-items: center;
  justify-content: center;
`
