import ChooseOneOptionQuestionBox from '@/components/preferences/ChooseOneOptionQuestionBox'
import ChooseOneOptionWithInputQuestionBox from '@/components/preferences/ChooseOneOptionWithInputQuestionBox'
import ErrorBox from '@/components/preferences/ErrorBox'
import PreferencesForm from '@/components/preferences/PreferencesForm'
import SliderQuestionBox from '@/components/preferences/SliderQuestionBox'
import { PreferencesFormProvider } from '@/contexts/preferencesFormContext'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { CITIES, QUESTIONS } from '@/utils/constants'
import { setUserPreferencesCookie } from '@/utils/cookies'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as S from './styles'
import { usePreferencesForm } from '@/contexts/preferencesFormContext'
import { getMatchesURL } from '@/utils/url'
import FindingBestScreen from '../../screens/FindingBestScreen'
import Chevron from '@/components/global/icons/Chevron'
import MapMarker from '@/components/global/icons/MapMarker'
import Link from 'next/link'
import { setCity } from '@/redux/slices/citySlice'

const PreferencesCard = ({
  backgroundOnClick,
  resetSlides,
  isTouchDevice
}: {
  backgroundOnClick: () => void
  resetSlides?: () => void
  isTouchDevice: boolean
}) => {
  const city = useAppSelector(state => state.city)
  const dispatch = useAppDispatch()
  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const [isLoading, setIsLoading] = useState(false)
  const { errors, dispatchErrors } = usePreferencesForm()
  const router = useRouter()
  const [showChooseNewCityCard, setChooseShowNewCityCard] = useState(false)

  return (
    <>
      <S.Background
        onClick={e => {
          e.stopPropagation()
          backgroundOnClick()
        }}
      >
        {isTouchDevice ? <S.MarginWrapper
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <S.Container>
            <S.Wrapper>
              <S.Heading>
                <S.Title>Your rental home preferences</S.Title>
                <S.Description>
                  {
                    "Click on a preference to change it and then click on the 'View matches' button."
                  }
                </S.Description>
              </S.Heading>
              <S.ChoosenCity>
                {city && <S.ChoosenCityName>
                  <MapMarker size={{ width: 13, height: 13 }} /> {city.name.display}
                  , {city.state.shortForm.display}
                </S.ChoosenCityName>}
                <S.ChangeCity onClick={() => {
                    setChooseShowNewCityCard(prev => !prev)
                  }}>
                    Change city{' '}
                    <Chevron
                      position={'right'}
                      size={{
                        width: 10,
                        height: 10,
                      }}
                      color={'#a3a3a3'}
                    />
                    <S.ChooseNewCityCard show={showChooseNewCityCard}>
                      <S.ChooseNewCityCardHeading>
                        <S.ChooseNewCityCardTitle>Choose your city</S.ChooseNewCityCardTitle>
                        <S.ChooseNewCityCardSubTitle>Click on of the cities below to choose it.</S.ChooseNewCityCardSubTitle>
                      </S.ChooseNewCityCardHeading>
                      <S.ChooseNewCityCardCityList>
                        {CITIES.map((city, i) => {
                          return (
                            <S.ChooseNewCityCardCityLi key={i}>
                              <S.ChooseNewCityCardCityButton onClick={() => {
                                setUserPreferencesCookie({
                                  city: city
                                })
                                dispatch(setCity(city))
                              }}>{`${city.name.display}, ${city.state.shortForm.display}`}</S.ChooseNewCityCardCityButton>
                            </S.ChooseNewCityCardCityLi>
                          )
                        })}
                      </S.ChooseNewCityCardCityList>
                    </S.ChooseNewCityCard>
                  </S.ChangeCity>
              </S.ChoosenCity>
              <PreferencesFormProvider>
                <S.PreferencesForm
                  id='preferences-form-for-you'
                  onSubmit={e => {
                    e.preventDefault()
                    if (city && rentalPreferences) {
                      setUserPreferencesCookie({
                        city: city,
                        rentalPreferences: rentalPreferences,
                      })
                      if (!errors.isError) {
                        setIsLoading(true)
                        router.reload()
                      } else {
                        dispatchErrors({
                          type: 'setShowErrors',
                          payload: true,
                        })
                      }
                    }
                  }}
                >
                  {QUESTIONS.map((question, i) => {
                    switch (question.type) {
                      case 'input':
                        return (
                          <ChooseOneOptionWithInputQuestionBox
                            question={question}
                            key={i}
                          />
                        )

                      case 'oneOption':
                        return (
                          <ChooseOneOptionQuestionBox
                            question={question}
                            key={i}
                          />
                        )

                      case 'slider':
                        return (
                          <SliderQuestionBox
                            question={question}
                            key={i}
                          ></SliderQuestionBox>
                        )
                    }
                  })}
                </S.PreferencesForm>
              </PreferencesFormProvider>
            </S.Wrapper>
            <S.Footer>
              <S.FindMatches
                as='input'
                type='submit'
                form='preferences-form-for-you'
                value='View matches'
              />
            </S.Footer>
          </S.Container>
        </S.MarginWrapper> : <S.DesktopContainer onClick={(e) => {
          e.stopPropagation()
        }}>
            <S.Wrapper>
              <S.Heading>
                <S.Title>Your rental home preferences</S.Title>
                <S.Description>
                  {
                    "Click on a preference to change it and then click on the 'View matches' button."
                  }
                </S.Description>
              </S.Heading>
              <S.ChoosenCity>
                {city && <S.ChoosenCityName>
                  <MapMarker size={{ width: 13, height: 13 }} /> {city.name.display}
                  , {city.state.shortForm.display}
                </S.ChoosenCityName>}
                  <S.ChangeCity onClick={() => {
                    setChooseShowNewCityCard(prev => !prev)
                  }}>
                    Change city{' '}
                    <Chevron
                      position={'right'}
                      size={{
                        width: 10,
                        height: 10,
                      }}
                      color={'#a3a3a3'}
                    />
                    <S.ChooseNewCityCard show={showChooseNewCityCard}>
                      <S.ChooseNewCityCardHeading>
                        <S.ChooseNewCityCardTitle>Choose your city</S.ChooseNewCityCardTitle>
                        <S.ChooseNewCityCardSubTitle>Click on of the cities below to choose it.</S.ChooseNewCityCardSubTitle>
                      </S.ChooseNewCityCardHeading>
                      <S.ChooseNewCityCardCityList>
                        {CITIES.map((city, i) => {
                          return (
                            <S.ChooseNewCityCardCityLi key={i}>
                              <S.ChooseNewCityCardCityButton onClick={() => {
                                setUserPreferencesCookie({
                                  city: city
                                })
                                dispatch(setCity(city))
                              }}>{`${city.name.display}, ${city.state.shortForm.display}`}</S.ChooseNewCityCardCityButton>
                            </S.ChooseNewCityCardCityLi>
                          )
                        })}
                      </S.ChooseNewCityCardCityList>
                    </S.ChooseNewCityCard>
                  </S.ChangeCity>
              </S.ChoosenCity>
              <PreferencesFormProvider>
                <S.PreferencesForm
                  id='preferences-form-for-you'
                  onSubmit={e => {
                    e.preventDefault()
                    if (city && rentalPreferences) {
                      setUserPreferencesCookie({
                        city: city,
                        rentalPreferences: rentalPreferences,
                      })
                      if (!errors.isError) {
                        setIsLoading(true)
                        router.reload()
                      } else {
                        dispatchErrors({
                          type: 'setShowErrors',
                          payload: true,
                        })
                      }
                    }
                  }}
                >
                  {QUESTIONS.map((question, i) => {
                    switch (question.type) {
                      case 'input':
                        return (
                          <ChooseOneOptionWithInputQuestionBox
                            question={question}
                            key={i}
                          />
                        )

                      case 'oneOption':
                        return (
                          <ChooseOneOptionQuestionBox
                            question={question}
                            key={i}
                          />
                        )

                      case 'slider':
                        return (
                          <SliderQuestionBox
                            question={question}
                            key={i}
                          ></SliderQuestionBox>
                        )
                    }
                  })}
                </S.PreferencesForm>
              </PreferencesFormProvider>
            </S.Wrapper>
            <S.Footer>
              <S.FindMatches
                as='input'
                type='submit'
                form='preferences-form-for-you'
                value='View matches'
              />
            </S.Footer>
          </S.DesktopContainer>}
      </S.Background>
      <ErrorBox />
      {isLoading ? <FindingBestScreen /> : null}
    </>
  )
}

export default PreferencesCard
