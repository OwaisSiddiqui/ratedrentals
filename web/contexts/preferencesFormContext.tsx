import { QUESTIONS } from '@/utils/constants'
import { Questions } from 'ratedrentals-types'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react'

interface QuestionState {
  index: number
  category: Questions[number]['category']
}

interface PreferencesFormError {
  category: Questions[number]['category']['value']
  index: number
}
interface ErrorsState {
  isError: boolean
  errors: PreferencesFormError[]
  showErrors: boolean
}

type QuestionAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setIndex'; payload: number }
type ErrorsAction =
  | { type: 'add'; payload: PreferencesFormError['category'] }
  | { type: 'remove'; payload: PreferencesFormError['category'] }
  | { type: 'setShowErrors'; payload: boolean }

const PreferencesFormContext = createContext<
  | {
      question: QuestionState
      dispatchQuestion: Dispatch<QuestionAction>
      errors: ErrorsState
      dispatchErrors: Dispatch<ErrorsAction>
    }
  | undefined
>(undefined)

const isError = (errors: ErrorsState['errors']) => {
  return errors.length !== 0
}

const questionReducer = (
  state: QuestionState,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case 'increment':
      return { index: state.index + 1, category: state.category }
    case 'decrement':
      return { index: state.index - 1, category: state.category }
    case 'setIndex':
      return { index: action.payload, category: state.category }
  }
}

const errorsReducer = (
  state: ErrorsState,
  action: ErrorsAction
): ErrorsState => {
  switch (action.type) {
    case 'add':
      if (
        state.errors.findIndex(error => error.category === action.payload) ===
        -1
      ) {
        const newErrors = [
          ...state.errors,
          {
            category: action.payload,
            index: QUESTIONS.findIndex(
              QUESTION => QUESTION.category.value === action.payload
            ),
          },
        ]
        return {
          isError: isError(newErrors),
          errors: newErrors,
          showErrors: state.showErrors,
        }
      } else {
        return state
      }
    case 'remove':
      if (
        state.errors.findIndex(error => error.category === action.payload) !==
        -1
      ) {
        const newErrors = state.errors.filter(
          error => error.category !== action.payload
        )
        return {
          isError: isError(newErrors),
          errors: newErrors,
          showErrors: state.showErrors,
        }
      } else {
        return state
      }
    case 'setShowErrors':
      return {
        isError: isError(state.errors),
        errors: state.errors,
        showErrors: action.payload,
      }
  }
}

const PreferencesFormProvider = ({ children }: PropsWithChildren<{}>) => {
  const [question, dispatchQuestion] = useReducer(questionReducer, {
    index: 0,
    category: QUESTIONS[0].category,
  })
  const [errors, dispatchErrors] = useReducer(errorsReducer, {
    isError: false,
    errors: [],
    showErrors: false,
  })

  return (
    <PreferencesFormContext.Provider
      value={{ question, dispatchQuestion, errors, dispatchErrors }}
    >
      {children}
    </PreferencesFormContext.Provider>
  )
}

const usePreferencesForm = () => {
  const context = useContext(PreferencesFormContext)
  if (context === undefined) {
    throw new Error(
      'usePreferencesForm must be used with a PreferencesFormProvider'
    )
  }
  return context
}

export { PreferencesFormProvider, usePreferencesForm }
