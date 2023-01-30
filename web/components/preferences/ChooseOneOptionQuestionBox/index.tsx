import {
  BedroomQuestion,
  BathroomQuestion,
  HomeQuestion,
} from 'ratedrentals-types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  Question,
  QuestionComponent,
  OptionsSection,
  OptionButton,
} from '@/components/preferences/shared'
import { usePreferencesForm } from '@/contexts/preferencesFormContext'
import {
  setBathrooms,
  setBedrooms,
  setHome,
} from '@/redux/slices/rentalPreferencesSlice'

const ChooseOneOptionQuestionBox = ({
  question,
}: {
  question: BedroomQuestion | BathroomQuestion | HomeQuestion
}) => {
  const dispatch = useAppDispatch()

  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const { dispatchQuestion } = usePreferencesForm()

  return (
    <Question>
      <QuestionComponent
        question={question.value}
        category={question.category.value}
      />
      <OptionsSection>
        {question.options.map((option, i: number) => {
          return (
            <OptionButton
              type='button'
              onClick={() => {
                if (question.category.value === 'bedrooms') {
                  dispatch(
                    setBedrooms(
                      option.value as BedroomQuestion['options'][number]['value']
                    )
                  )
                } else if (question.category.value === 'bathrooms') {
                  dispatch(
                    setBathrooms(
                      option.value as BathroomQuestion['options'][number]['value']
                    )
                  )
                } else {
                  dispatch(
                    setHome(
                      option.value as HomeQuestion['options'][number]['value']
                    )
                  )
                }
                dispatchQuestion({
                  type: 'increment',
                })
              }}
              key={i}
              isSelected={
                rentalPreferences[question.category.value].value ===
                option.value
              }
            >
              {option.display}
            </OptionButton>
          )
        })}
      </OptionsSection>
    </Question>
  )
}

export default ChooseOneOptionQuestionBox
