import { RentalPreferences } from 'ratedrentals-types'
import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import * as S from './styles'
import { usePreferencesForm } from '@/contexts/preferencesFormContext'
import Close from '@/components/global/icons/Close'

// https://stackoverflow.com/a/67452316
type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

const ErrorBox = () => {
  const rentalPreferences = useAppSelector(state => state.rentalPreferences)
  const { errors, dispatchErrors, dispatchQuestion } = usePreferencesForm()

  useEffect(() => {
    const rentalPreferencesEntries = Object.entries(
      rentalPreferences
    ) as Entries<RentalPreferences>
    for (const [key, rentalPreference] of rentalPreferencesEntries) {
      if (
        rentalPreference.question.type === 'input' &&
        rentalPreference.selection !== null &&
        rentalPreference.value === null
      ) {
        dispatchErrors({
          type: 'add',
          payload: key,
        })
      } else if (rentalPreference.question.type === 'input')
        dispatchErrors({
          type: 'remove',
          payload: key,
        })
    }
  }, [dispatchErrors, rentalPreferences])

  useEffect(() => {
    if (errors.showErrors && !errors.isError) {
      dispatchErrors({
        type: 'setShowErrors',
        payload: false,
      })
    }
  }, [dispatchErrors, errors.isError, errors.showErrors])

  return (
    <S.ErrorSection visible={errors.showErrors}>
      <S.Close
        onClick={() => {
          dispatchErrors({
            type: 'setShowErrors',
            payload: false,
          })
        }}
        type='button'
      >
        <Close size={{ width: 20, height: 20 }} />
      </S.Close>
      <S.ErrorTitle>Please fill in the following options:</S.ErrorTitle>
      <S.ErrorUL>
        {errors.errors.map((error, index) => {
          return (
            <S.ErrorLI key={index}>
              <S.ErrorButton
                onClick={() => {
                  dispatchQuestion({
                    type: 'setIndex',
                    payload: error.index,
                  })
                }}
                type='button'
              >
                {error.category}
              </S.ErrorButton>
            </S.ErrorLI>
          )
        })}
      </S.ErrorUL>
    </S.ErrorSection>
  )
}

export default ErrorBox
