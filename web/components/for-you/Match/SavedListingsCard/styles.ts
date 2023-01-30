import { PrimaryButton } from '@/components/styles'
import styled from 'styled-components'
import { loadingAnimation } from '@/components/styles'

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  align-items: stretch;
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  /* padding: 2rem; */
  gap: 2rem;
  border-radius: 10px 10px 0 0;
  background: white;
  min-height: 100%;
`

export const MarginWrapper = styled.div`
  margin-top: 40%;
  width: 100%;
`

export const Title = styled.h1`
  font-weight: 600;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

export const Description = styled.div`
  font-size: 13px;
  color: #949494;
  line-height: 17px;
`

export const FindMatches = styled(PrimaryButton)`
  width: 100%;
`

export const PreferencesForm = styled.form``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  border-radius: 10px 10px 0 0;
  flex: 0 0 100%;
`

export const Footer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e2e2e2;
`

export const SavedListings = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 100%;
`

export const SavedListingLi = styled.div`
  display: flex;
  position: relative;
  height: 4rem;
  width: 100%;
  flex-shrink: 0;
  justify-content: flex-end;
  border: none;
`

export const LinkContainer = styled.a`
  display: flex;
  text-decoration: none;
  color: inherit;
  gap: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

export const EditButton = styled.button`
  padding: 0;
  margin: 0;
  color: rgb(0, 122, 255);
  background: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
`

export const DeleteButtonWrapper = styled.div`
  padding: 0.5rem 0 0.5rem 0.5rem;
  height: 100%;
`

export const DeleteButton = styled.button`
  background: red;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  margin: 0;
  border-radius: 7px;
  flex-shrink: 0;
  cursor: pointer;
`

export const SavedListing = styled.div`
  display: flex;
  border-radius: 7px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  align-items: center;
  overflow: hidden;
  flex: 0 0 100%;
  height: 4rem;
  width: 100%;
  /* border: 1px solid #e2e2e2; */
`

export const Picture = styled.div<{
  isLoading: boolean
}>`
  border-radius: 20px;
  position: relative;
  display: flex;
  width: 3rem;
  height: 3rem;
  border-radius: 7px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e2e2e2;
  animation: ${({ isLoading }) => (isLoading ? loadingAnimation : null)};
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-self: flex-start;
  gap: 3px;
  flex: 1;
  padding-top: 0.5rem;
  padding-right: 0.5rem;
`

export const TitleAddress = styled.h1`
  font-weight: 600;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const None = styled.span`
  color: lightgrey;
  font-style: italic;
  flex: 1;
  text-align: center;
`

export const ListingDescription = styled.div`
  color: grey;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const DesktopContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 40rem;
  max-width: 40rem;
  background: white;
  overflow: auto;
  align-self: center;
  border-radius: 7px;
  pointer-events: auto;
  z-index: 3;
`