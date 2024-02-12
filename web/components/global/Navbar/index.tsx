import Link from 'next/link'
import Logo from '@/public/icons/logo-new-7.svg'
import Image from 'next/image'
import * as S from './styles'

interface Page {
  name: string
  url: string
}

const pages: Page[] = [
  {
    name: 'Status',
    url: '/status',
  },
  {
    name: 'Contact',
    url: '/contact',
  }
]

const DesktopNavbar = () => {
  return (
    <S.Container>
      <Link href='/' passHref>
        <S.LogoLink>
          <S.Logo>
            <Image
              src={Logo}
              layout='fill'
              alt='RatedRentals logo'
              objectFit='contain'
            />
          </S.Logo>
        </S.LogoLink>
      </Link>
      <S.Pages>
        {pages.map((page, i) => {
          return (
            <S.Page key={i}>
              <Link href={page.url} passHref>
                <S.PageLink>{page.name}</S.PageLink>
              </Link>
            </S.Page>
          )
        })}
      </S.Pages>
    </S.Container>
  )
}

export default DesktopNavbar