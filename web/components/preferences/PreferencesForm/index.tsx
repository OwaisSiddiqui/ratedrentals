import Link from 'next/link'
import { useRouter } from 'next/router'
import { Questions } from 'ratedrentals-types'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getListingsURL } from '@/utils/url'
import ChooseOneOptionQuestionBox from '@/components/preferences/ChooseOneOptionQuestionBox'
import ChooseOneOptionWithInputQuestionBox from '@/components/preferences/ChooseOneOptionWithInputQuestionBox'
import ErrorBox from '@/components/preferences/ErrorBox'
import SliderQuestionBox from '@/components/preferences/SliderQuestionBox'
import * as S from './styles'
import { getMatchesURL } from '@/utils/url'
import { usePreferencesForm } from '@/contexts/preferencesFormContext'
import { QUESTIONS } from '@/utils/constants'
import cookie from 'cookie'
import { setUserPreferencesCookie } from '@/utils/cookies'
import FindingBestScreen from '@/components/for-you/screens/FindingBestScreen'

const PreferencesForm = () => {
  const city = useAppSelector(state => state.city)
  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const [isLoading, setIsLoading] = useState(false)
  const {
    question: questionState,
    errors,
    dispatchErrors,
    dispatchQuestion,
  } = usePreferencesForm()

  const router = useRouter()

  return (
    <S.Container
      id='user-preferences-form'
      onSubmit={event => {
        if (city) {
          event.preventDefault()
          setUserPreferencesCookie({
            city: city,
            rentalPreferences: rentalPreferences,
          })
          if (!errors.isError) {
            setIsLoading(true)
            let url = getMatchesURL({
              city: city,
              rentalPreferences: rentalPreferences,
            })
            router.push(url).then(() => setIsLoading(false))
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
        if (questionState.index === i) {
          switch (question.type) {
            case 'input':
              return (
                <ChooseOneOptionWithInputQuestionBox
                  question={question}
                  key={i}
                />
              )

            case 'oneOption':
              return <ChooseOneOptionQuestionBox question={question} key={i} />

            case 'slider':
              return (
                <SliderQuestionBox
                  question={question}
                  key={i}
                ></SliderQuestionBox>
              )
          }
        }
      })}
      <S.Footer>
        <S.ContinueButton
          onClick={() => {
            dispatchQuestion({
              type: 'decrement',
            })
          }}
          show={questionState.index !== 0}
          type='button'
          as='input'
          value='Back'
        />
        <S.ContinueButton
          onClick={() => {
            dispatchQuestion({
              type: 'increment',
            })
          }}
          show={questionState.index !== QUESTIONS.length - 1}
          type='button'
          as='input'
          value='Next'
        />
        <S.ViewMatchesButton
          show={questionState.index === QUESTIONS.length - 1}
          type='submit'
          form='user-preferences-form'
          as='input'
          value='View matches'
        />
      </S.Footer>
      <ErrorBox />
      {isLoading ? <FindingBestScreen /> : null}
    </S.Container>
  )
}

export default PreferencesForm
