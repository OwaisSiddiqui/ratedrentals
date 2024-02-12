import { devices } from '@/utils/constants'
import styled from 'styled-components'

export const Container = styled.div`
  flex: 0 1 auto;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99999;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  // gap: 5rem;
  background: white;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  overflow: hidden;
  @media ${devices.tabletS} {
    justify-content: center;
    gap: 20rem;
  }
`

export const Pages = styled.ul`
  display: flex;
  white-space: nowrap;
  margin-right: 2rem;
  gap: 1rem;
  @media ${devices.tablet} {
    margin-right: 1rem;
    gap: 3rem;
  }
`

export const LogoLink = styled.a`
  display: flex;
  align-items: center;
`

export const BurgerIconWrapper = styled.div`
  padding: 1.1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${devices.tabletS} {
    display: none;
  }
`

export const Page = styled.li`
  font-family Poppins;
  font-size: 12px;
  display: flex;
  flex: 1;
`

export const PageLink = styled.a`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export const RightArrow = styled.span`
  font-family Poppins;
  font-size: 12px;
`

export const PageSeperator = styled.div`
  height: 1px;
  background: #e2e2e2;
  display: flex;
  margin-left: 1rem;
`

export const MenuItemPage = styled.a`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 1.1rem 1rem;
  align-items: center;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export const SignUpLogInSection = styled.div`
  display: flex;
  padding: 1rem 1rem;
  justify-content: space-between;
  gap: 1rem;
`

export const SignUp = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.hex};
  border: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
  padding: 0.7rem 0;
  flex: 1;
  border-radius: 3px;
  font-family: ${({ theme }) => theme.font.family.primary};
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
  font-size: 12px;
`

export const LogIn = styled(SignUp)`
  color: ${({ theme }) => theme.colors.primary.hex};
  background: white;
`

export const Logo = styled.div`
  position: relative;
  width: 10rem;
  margin: 0 2rem;
  box-sizing: border-box;
  height: 2rem;
`