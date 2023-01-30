import { PrimaryButton } from '@/components/styles'
import styled from 'styled-components'
export {}

import { Title as SharedTitle } from '@/components/for-you/Listing/shared/styles'

export const Title = styled(SharedTitle)`
  margin-bottom: 0.5rem;
`

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const MainDetails = styled.section`
  display: flex;
  gap: 0.5rem;
`

export const ContactButton = styled(PrimaryButton)`
  gap: 0.5rem;
  /* border-radius: 0; */
  /* background: black; */
  color: white;
  font-weight: 600;
  /* padding: 0.5rem 0; */
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
`

export const ListingPosterTitle = styled.span``

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`

export const Star = styled.div``

export const Rating = styled.span``

export const ReviewsLink = styled.a`
  text-decoration: underline;
`

export const ListingFromLink = styled.span`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-weight: 400;
  font-size: 12px;

  color: #867474;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const ListingSourceLink = styled.a`
  color: #867474;
`

export const ProfilePictureContainer = styled.div<{
  isInitials: boolean
}>`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: #f2f2f2;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: ${({ isInitials }) => (isInitials ? 'center' : 'flex-end')};
  flex-shrink: 0;
`

export const ProfilePicture = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  font-size: 18px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.font.family.primary};
`

export const ProfileInitials = styled.span`
  font-weight: 600;
  text-transform: uppercase;
`
