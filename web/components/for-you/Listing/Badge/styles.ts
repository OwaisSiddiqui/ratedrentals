import styled from 'styled-components'

export const Container = styled.div<{
  color: string
}>`
  display: flex;
  padding: 4px 6px;
  background: ${({ color }) => color};
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`

export const Name = styled.span<{
  color: string
}>`
  font-family: ${({ theme }) => theme.font.family.primary};
  color: ${({ color }) => color};
  font-size: 11px;
  font-weight: 600;
`
