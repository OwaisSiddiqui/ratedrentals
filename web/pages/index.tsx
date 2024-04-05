import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '@/components/global/Footer'
import SearchBar from '@/components/global/Searchbar'
import InfoCard from '@/components/index/InfoCard'
import Link from 'next/link'
import * as S from '@/components/index/page.styles'
import Chevron from '@/components/global/icons/Chevron'
import BetaHeader from '@/components/index/BetaHeader'
import { useRouter } from 'next/router'
import AvailableCities from '@/components/index/AvailableCities/index'
import cookie from 'cookie'
import { isAvailableCity } from '@/utils/city'
import { GetServerSidePropsContext } from 'next'
import Navbar from '@/components/global/Navbar'

const Home = () => {
  const router = useRouter()
  const [showAvailableCities, setShowAvailableCities] = useState(false)

  useEffect(() => {
    if ('available-cities' in router.query) {
      setShowAvailableCities(true)
    } else {
      setShowAvailableCities(false)
    }
  }, [router.query])

  useEffect(() => {
    if (showAvailableCities) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
    }
  }, [showAvailableCities])

  return (
    <>
      <Head>
        <title>
          RatedRentals: Personalised rental home listings for you
        </title>
      </Head>
      <Navbar />
      <S.HeroImage>
        <S.MainTitleSection>
          <S.HeadingsSection>
            <S.MainSubHeading>
              Find your next rental home with personalised listings
            </S.MainSubHeading>
          </S.HeadingsSection>
          <SearchBar data={{ type: 'home' }} />
        </S.MainTitleSection>
      </S.HeroImage>
      <S.MainContentSection>
        <S.MainContentHeading>
          <S.MainContentDescription>
            We are not like every other rental homes site. We help you find your
            next rental home by curating and personalisizing the best rental
            home listings for you based on your rental home preferences.
          </S.MainContentDescription>
        </S.MainContentHeading>
        <S.CardsSection>
          <InfoCard
            title={{
              main: 'Choose a city',
              sub: 'First',
            }}
            description='Use the search bar on the very top of the page. Enter your city and choose from the available selection.'
          />
          <InfoCard
            title={{
              main: 'Choose your rental home preferences',
              sub: 'Second',
            }}
            description='Choose from basic preferences such as number of bedrooms to more unique ones such as priority of location.'
          />
          <InfoCard
            title={{
              main: 'Go through your matches!',
              sub: 'Finally',
            }}
            description='You now have personalised rental home listings for you to go through. If you like one, you can contact the poster through the external site. If you don’t like one, you can skip and give feedback so we can keep giving you better matches!'
          />
        </S.CardsSection>
      </S.MainContentSection>
      <Footer />
      {showAvailableCities ? <AvailableCities /> : null}
    </>
  )
}

export const getServerSideProps = async ({
  req,
  query,
}: GetServerSidePropsContext) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    if (cookies['city'] && cookies['rentalPreferences']) {
      const cityName: string = cookies['city']
      if (isAvailableCity(cityName)) {
        return {
          redirect: {
            destination: '/for-you',
            permenant: false,
          },
        }
      }
    }
    return {
      props: {},
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default Home
