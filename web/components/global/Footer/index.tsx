import Link from 'next/link'
import logo from '@/public/icons/logo.svg'
import * as S from './styles'

const Footer = () => {
  return (
    <S.Container>
      <Link href='/' passHref>
        <S.CompanyName>RatedRentals</S.CompanyName>
      </Link>
      <S.NavLinks>
        <S.NavLi>
          <Link passHref href='/contact'>
            <S.NavLink>Contact</S.NavLink>
          </Link>
        </S.NavLi>
      </S.NavLinks>
    </S.Container>
  )
}

export default Footer
