import { devices } from '@/utils/constants'
import { SearchbarType } from 'ratedrentals-types'
import styled, { keyframes } from 'styled-components'

export const Container = styled.section<{
  isSearchbarInputFocused: boolean
  isSuggestions: boolean
  type: SearchbarType
}>`
  display: flex;
  flex-direction: column;
  z-index: 999;
  background: white;
  position: relative;
  &:hover {
    /* box-shadow: ${({ theme }) =>
      `0px 0px 0px 6px rgb(${theme.colors.primary.rgb.r}, ${theme.colors.primary.rgb.g}, ${theme.colors.primary.rgb.b}, 0.1)`}; */
  }
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.08);
  padding: 0;
  width: 100%;
  border-radius: ${({ type, isSuggestions }) =>
    isSuggestions ? '7px 7px 0 0' : type === 'home' ? '7px' : '0px'};
  justify-content: center;
`

export const SearchbarSection = styled.div<{
  isSearchResults: boolean
}>``

export const Suggestions = styled.ul<{
  show: boolean
  type: SearchbarType
}>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  background: white;
  position: absolute;
  top: 100%;
  width: 100%;
  border-radius: ${({ type }) => (type === 'home' ? '0 0 7px 7px' : '0')};
  overflow: hidden;
  border-bottom: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  border-left: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  border-right: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  margin-bottom: 20rem;
`

export const Suggestion = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #f3f3f3;
  }
  background: white;
  display: flex;
  overflow: hidden;
  &:hover {
    background: rgb(231, 231, 231);
  }
  cursor: pointer;
  width: 100%;
  color: black;
  text-decoration: none;
`

export const SuggestionText = styled.address<{
  noSuggestions: boolean
}>`
  overflow: hidden;
  display: flex;
  gap: 0.3em;
  align-items: center;
  padding: ${({ noSuggestions }) =>
    noSuggestions ? '1rem' : '1rem 1rem 1rem 0'};
  flex: 1;
  line-height: 23px;
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const City = styled.span`
  text-transform: capitalize;
  word-break: break-all;
`

export const State = styled.span`
  color: black;
  text-transform: uppercase;
  word-break: break-all;
`

export const SuggestionLink = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
  background: white;
  &:hover {
    background: rgb(231, 231, 231);
  }
`

export const LocationIconWrapper = styled.div`
  padding: 0 0.6rem 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchIcon = styled.div``

export const SearchBarInputForm = styled.form<{
  isSuggestions: boolean
  type: SearchbarType
}>`
  display: flex;
  /* border-left: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
  border-right: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`};
  border-top: ${({ theme }) => `1px solid ${theme.colors.primary.hex}`}; */
  gap: 5px;
  border-top: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  border-bottom: ${({ type, theme, isSuggestions }) =>
    type === 'home'
      ? isSuggestions
        ? '1px solid #f3f3f3'
        : `1px solid ${theme.colors.primary.hex}`
      : 'none'};
  border-right: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  border-left: ${({ type, theme }) =>
    type === 'home' ? `1px solid ${theme.colors.primary.hex}` : 'none'};
  border-radius: ${({ isSuggestions }) =>
    isSuggestions ? '7px 7px 0 0' : '7px'};
  height: 4rem;
`

export const SearchbarInput = styled.input`
  font-family: ${({ theme }) => theme.font.family.primary};
  border: none; /* for iOS */
  margin: 0; /* for iOS */
  border-radius: 0; /* for iOS */
  -webkit-appearance: none; /* for iOS */
  min-width: 0; /* to remove it's default width and work nicely with flexbox */
  flex: 1;
  &::placeholder {
    color: #bebebe;
  }
  background: transparent;
  font-size: 16px;
  padding: 0 1.5rem 0 0;
  // Removes blue outline on Chrome and removes this weird selection blue color on left of text on iOS
  &:focus {
    outline: none;
  }
`

export const SearchIconSection = styled.div`
  position: relative;
  width: 2rem;
  align-items: center;
  justify-content: flex-end;
  display: flex;
`
