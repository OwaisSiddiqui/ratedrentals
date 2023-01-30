import styled from 'styled-components'

export const Container = styled.svg`
  align-self: center; /* have to use this as cannot use align-items: center on container since it will make Logo have 0 height */
`

interface RectProps {
  isOpen: boolean
}

export const TopRect = styled.rect<RectProps>`
  transform: ${({ isOpen }) =>
    isOpen ? 'rotate(45deg) translateY(16px)' : 'rotate(0deg)'};
  transform-origin: center;
`

export const BottomRect = styled.rect<RectProps>`
  transform: ${({ isOpen }) =>
    isOpen ? 'rotate(-45deg) translateY(-24px)' : 'rotate(0deg)'};
  transform-origin: center;
`
