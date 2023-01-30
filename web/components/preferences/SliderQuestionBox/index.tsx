import { PriorityOptions, PriorityQuestion } from 'ratedrentals-types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setPriority } from '@/redux/slices/rentalPreferencesSlice'
import { QuestionComponent } from '@/components/preferences/shared'
import * as S from './styles'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

export const MIN_SLIDER_VALUE = 1
export const MAX_SLIDER_VALUE = 10

const SliderQuestionBox = ({ question }: { question: PriorityQuestion }) => {
  const dispatch = useAppDispatch()
  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const themeContext = useContext(ThemeContext)

  const getSliderBackground = (sliderValue: number) => {
    let value =
      ((sliderValue - MIN_SLIDER_VALUE) /
        (MAX_SLIDER_VALUE - MIN_SLIDER_VALUE)) *
      100
    return `linear-gradient(to right, ${themeContext.colors.primary.hex} 0%, ${themeContext.colors.primary.hex} ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  }

  return (
    <S.SliderQuestionBoxComponent>
      <QuestionComponent
        question={question.value}
        category={question.category.value}
      />
      <S.SliderQuestionBoxes>
        {question.options.map((option, index) => {
          return (
            <S.SliderQuestionBox key={index}>
              <S.OptionSpan>{option.label.display}</S.OptionSpan>
              <S.SliderSection>
                <S.SliderRangeNumber>{MIN_SLIDER_VALUE}</S.SliderRangeNumber>
                <S.Slider
                  type='range'
                  min={MIN_SLIDER_VALUE}
                  max={MAX_SLIDER_VALUE}
                  onInput={event => {
                    let slider = event.target as HTMLInputElement
                    let sliderValue: string | number = slider.value
                    sliderValue = parseInt(sliderValue)
                    dispatch(
                      setPriority({
                        category: option.category.value,
                        value: sliderValue as PriorityOptions,
                      })
                    )
                    slider.style.background = getSliderBackground(sliderValue)
                  }}
                  value={(() => {
                    const value =
                      rentalPreferences.priority.categories[
                        option.category.value
                      ].value
                    if (value) {
                      return value.toString()
                    } else {
                      return MIN_SLIDER_VALUE
                    }
                  })()}
                  data-option-name={option.value}
                  style={{
                    background: (() => {
                      return getSliderBackground(
                        rentalPreferences.priority.categories[
                          option.category.value
                        ].value ?? MIN_SLIDER_VALUE
                      )
                    })(),
                  }}
                />
                <S.SliderRangeNumber>{MAX_SLIDER_VALUE}</S.SliderRangeNumber>
              </S.SliderSection>
            </S.SliderQuestionBox>
          )
        })}
      </S.SliderQuestionBoxes>
    </S.SliderQuestionBoxComponent>
  )
}

export default SliderQuestionBox
