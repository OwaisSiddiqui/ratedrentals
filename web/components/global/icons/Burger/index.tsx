import * as S from './styles'

interface BurgerProps {
  isOpen: boolean
}

const Burger = ({ isOpen }: BurgerProps) => {
  return (
    <S.Container
      xmlns='http://www.w3.org/2000/svg'
      width='20px'
      height='20px'
      viewBox='0 0 100 100'
    >
      <S.TopRect
        width='100'
        height='8'
        ry='4'
        y='30'
        isOpen={isOpen}
        fill='currentColor'
      ></S.TopRect>
      <S.BottomRect
        width='100'
        height='8'
        ry='4'
        y='70'
        isOpen={isOpen}
        fill='currentColor'
      ></S.BottomRect>
    </S.Container>
  )
}

export default Burger
