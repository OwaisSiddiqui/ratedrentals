import Head from 'next/head'
import PreferencesForm from '@/components/preferences/PreferencesForm'
import { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { COMPANY_NAME, QUESTIONS } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCity } from '@/redux/slices/citySlice'
import * as S from '@/components/preferences/page.styles'
import { isAvailableCity } from '@/utils/city'
import { getCity } from '@/utils/city'
import Link from 'next/link'
import { getListingsURL } from '@/utils/url'
import { toUpperCaseFirstLetter } from '@/utils/miscellaneous'
import { PreferencesFormProvider } from '@/contexts/preferencesFormContext'
import { AvailableCities } from 'ratedrentals-types'
import { getMatchesURL } from '@/utils/url'
import Instructions from '@/components/preferences/Instructions'
import Chevron from '@/components/global/icons/Chevron'
import { getCityUrl } from '@/utils/url'
import mapMarkerIcon from '@/public/icons/map-marker-new.svg'
import MapMarker from '@/components/global/icons/MapMarker'

const Preferences = ({ city }: { city: AvailableCities }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (city) {
      dispatch(setCity(city))
    }
  }, [dispatch, city])

  return (
    <S.Container>
      <Head>
        <title>{`Choose your rental home preferences - ${COMPANY_NAME}`}</title>
      </Head>
      <S.PageHeader>Choose Your Preferences</S.PageHeader>
      <PreferencesFormProvider>
        <PreferencesForm />
      </PreferencesFormProvider>
      {city ? (
        <>
          <S.ChoosenCity>
            <S.ChoosenCityName>
              <MapMarker size={{ width: 13, height: 13 }} /> {city.name.display}
              , {city.state.shortForm.display}
            </S.ChoosenCityName>
            <Link passHref href='/'>
              <S.ChangeCity>
                Change city{' '}
                <Chevron
                  position={'right'}
                  size={{
                    width: 10,
                    height: 10,
                  }}
                  color={'#a3a3a3'}
                />
              </S.ChangeCity>
            </Link>
          </S.ChoosenCity>
          <Link
            href={getMatchesURL({
              city: city,
            })}
            passHref
          >
            <S.SkipLink>
              Skip and view latest listings in {city.name.display}
              <Chevron
                size={{ width: 10, height: 10 }}
                color='#828282'
                position='right'
              />
            </S.SkipLink>
          </Link>
        </>
      ) : null}
    </S.Container>
  )
}

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  try {
    if (!(typeof query.city === 'string')) {
      throw new Error('Params are not well defined.')
    }

    const cityName: string = query.city

    if (!isAvailableCity(cityName)) {
      throw new Error('City not in available cities.')
    }

    const city = getCity(cityName)

    return {
      props: {
        city,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}

export default Preferences
