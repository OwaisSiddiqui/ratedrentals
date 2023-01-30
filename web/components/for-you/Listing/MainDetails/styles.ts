import styled from 'styled-components'

export const Container = styled.div<{
  type: 'match' | 'card'
}>`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  height: 100%;
  /* flex: 1; */
  /* overflow: hidden; */
  /* justify-content: space-between; */
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const NotViewedIndicator = styled.div`
  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  left: -0.7rem;
  background: red;
`

export const Price = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const PropertyDetailsSection = styled.ul<{
  type: 'card' | 'match'
}>`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 14px;
  overflow: ${({ type }) => (type === 'match' ? 'hidden' : 'initial')};
  flex-wrap: ${({ type }) => (type === 'match' ? 'nowrap' : 'wrap')};
  align-items: flex-start;
  flex: 1;
`

export const NotAvailableSection = styled.div`
  display: flex;
  align-items: center;
  background: #e00034;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  justify-content: center;
`

export const NotAvailable = styled.div`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: white;
  height: 0.9 rem;
  font-size: 12px;
  display: flex;
  align-items: center;
  align-self: center;
  gap: 0.3rem;
`

export const PropertyDetailSection = styled.li`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const PropertyDetail = styled.span<{
  capitalize: boolean
}>`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-style: normal;
  font-weight: 400;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : null)};
  font-size: 12px;
  white-space: nowrap;
`

export const Middle = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  flex: 1;
`

export const TimeAgo = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  background: rgba(245, 245, 245, 0.05);
  border-radius: 4px;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 500;
  font-size: 10px;
  text-align: right;
  color: #9c9c9c;
`

export const LeftMiddle = styled.div`
  display: flex;
  flex-direction: column;
`

export const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
`

export const NewBadge = styled.div`
  border-radius: 2px;
  color: rgb(96, 96, 96);
  background: rgba(0, 0, 0, 0.05);
  padding: 3px 4px;
  font-size: 11px;
`

export const MapSection = styled.div``

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  gap: 0.2rem;
`
