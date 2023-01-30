import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 0 1.5rem;
  height: 100%;
  width: 100%;
  padding-top: 10rem;
  background: white;
`

export const Title = styled.h1`
  font-size: 23px;
  color: black;
  line-height: 35px;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 600;
`

export const Description = styled.p`
  font-size: 16px;
  color: #838383;
  line-height: 25px;
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const YourPreferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  font-size: 13px;
`

export const Preferences = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: auto;
`

export const Preference = styled.span`
  border-radius: 2px;
  color: rgb(96, 96, 96);
  background: rgba(0, 0, 0, 0.05);
  padding: 3px 4px;
  font-size: 11px;
  &:first-letter {
    text-transform: uppercase;
  }
`
