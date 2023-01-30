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
  justify-content: center;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  /* padding: 2rem; */
  gap: 2rem;
  border-radius: 10px 10px 0 0;
  background: white;
  min-height: 100%;
  flex: 0 0 100%;
`

export const MarginWrapper = styled.div`
  margin-top: auto;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  border-radius: 10px 10px 0 0;
  flex: 0 0 100%;
`

export const ShareOptions = styled.ul`
  display: flex;
  height: 2rem;
  flex: 1;
`

export const ShareOptionLi = styled.li``

export const ShareOption = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  padding: 0.5rem;
  border-radius: 7px;
  background: white;
  cursor: pointer;
`

export const AddressLink = styled.a`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const CopyingNotSupported = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ShareOptionLabel = styled.span`
  font-size: 12px;
  color: grey;
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