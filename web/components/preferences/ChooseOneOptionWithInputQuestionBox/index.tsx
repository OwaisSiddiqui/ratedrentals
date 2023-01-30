import {
  HomeQuestion,
  RentalPreferences,
  RentQuestion,
  SizeQuestion,
} from 'ratedrentals-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSize, setRent } from '@/redux/slices/rentalPreferencesSlice'
import {
  QuestionComponent,
  OptionButton,
  OptionsSection,
  Question,
} from '@/components/preferences/shared'
import * as S from './styles'
import { usePreferencesForm } from '@/contexts/preferencesFormContext'

const ChooseOneOptionWithInputQuestionBox = ({
  question,
}: {
  question: RentQuestion | SizeQuestion
}) => {
  const dispatch = useAppDispatch()

  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const { dispatchQuestion, dispatchErrors } = usePreferencesForm()
  const [isCustomOptionSelected, setIsCustomOptionSelected] = useState(false)

  const customInputRef = useRef<HTMLInputElement | null>(null)

  const focusCustomInput = () => {
    if (customInputRef.current) {
      customInputRef.current.focus()
    }
  }

  useEffect(() => {
    if (isCustomOptionSelected && customInputRef.current) {
      focusCustomInput()
    }
  }, [isCustomOptionSelected, customInputRef])

  useEffect(() => {
    if (
      rentalPreferences[question.category.value].selection === 'customRent' ||
      rentalPreferences[question.category.value].selection === 'customSize'
    ) {
      setIsCustomOptionSelected(true)
    }
  }, [
    question.category.value,
    rentalPreferences,
    rentalPreferences.rent.selection,
    rentalPreferences.size.selection,
  ])

  return (
    <Question>
      <QuestionComponent
        question={question.value}
        category={question.category.display}
      />
      <OptionsSection>
        {question.options.map((option, i: number) => {
          return (
            <OptionButton
              type='button'
              onClick={() => {
                if (!option.hasInput) {
                  dispatchQuestion({
                    type: 'increment',
                  })
                } else {
                  setIsCustomOptionSelected(true)
                }
                if (question.category.value === 'rent') {
                  dispatch(
                    setRent({
                      value: option.hasInput
                        ? null
                        : (option.value as RentalPreferences['rent']['selection']),
                      selection:
                        option.value as RentalPreferences['rent']['selection'],
                    })
                  )
                } else if (question.category.value === 'size') {
                  dispatch(
                    setSize({
                      value: option.hasInput
                        ? null
                        : (option.value as RentalPreferences['size']['selection']),
                      selection:
                        option.value as RentalPreferences['size']['selection'],
                    })
                  )
                }
              }}
              key={i}
              isSelected={
                rentalPreferences[question.category.value].selection ===
                option.value
              }
            >
              {option.display}
            </OptionButton>
          )
        })}
      </OptionsSection>
      <S.CustomInputSection
        show={isCustomOptionSelected}
        onClick={focusCustomInput}
      >
        <S.UnitSpan isLeft={question.unit.isLeft}>
          {question.unit.value}
        </S.UnitSpan>
        <S.CustomInput
          type='number'
          inputMode='numeric'
          onChange={event => {
            let input = event.target as HTMLInputElement
            let valueNumber = input.valueAsNumber
            if (question.category.value === 'rent') {
              dispatch(
                setRent({
                  value: isNaN(valueNumber) ? null : valueNumber,
                  selection: 'customRent',
                })
              )
            } else if (question.category.value === 'size') {
              dispatch(
                setSize({
                  value: isNaN(valueNumber) ? null : valueNumber,
                  selection: 'customSize',
                })
              )
            }
            dispatchErrors({
              type: 'remove',
              payload: question.category.value,
            })
          }}
          ref={customInputRef}
          isUnitLeft={question.unit.isLeft}
          value={(() => {
            const value = rentalPreferences[question.category.value].value
            return typeof value === 'number' ? value.toString() : ''
          })()}
        />
      </S.CustomInputSection>
    </Question>
  )
}

export default ChooseOneOptionWithInputQuestionBox
