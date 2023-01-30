import Footer from '@/components/global/Footer'
import Chevron from '@/components/global/icons/Chevron'
import Link from 'next/link'
import { ReactNode } from 'react'
import Slide from '..'
import InfoSlide from '../../InfoSlide'
import * as S from './styles'

const LookingFor = ({ isTouchDevice, navigateListingsComponent }: {
  isTouchDevice: boolean
  navigateListingsComponent: ReactNode
}) => {
  return (
    <InfoSlide
      navigateListingsComponent={navigateListingsComponent}
      isTouchDevice={isTouchDevice}
      title='Looking for a rental home?'
      subtitle='Choose your own rental home preferencs and get personalised listings. Click the button below to get started.'
    >
      <S.Container>
        <Link href='/' passHref>
          <S.GetStarted as='a'>
            Get Started{' '}
            <Chevron
              position='right'
              color='white'
              size={{ width: 15, height: 15 }}
            />
          </S.GetStarted>
        </Link>
        <Footer />
      </S.Container>
    </InfoSlide>
  )
}

export default LookingFor
