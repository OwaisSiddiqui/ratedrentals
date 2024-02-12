import styled from 'styled-components'

export const Container = styled.footer`
  background: white;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  height: 4rem;
  gap: 5rem;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
`

export const CompanyName = styled.a`
  color: black;
  text-decoration: none;
`

export const LogoLink = styled.a`
  position: relative;
  width: 7rem;
  height: 100%;
  font-size: 14px;
  
`

export const NavLinks = styled.ul`
  gap: 0.5rem;
  display: flex;
`

export const NavLi = styled.li``

export const NavLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  color: black;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 14px;
`
