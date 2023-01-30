import { QUESTIONS } from '@/utils/constants'
import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit'
import { RentalPreferences } from 'ratedrentals-types'

const initialState: RentalPreferences = {
  bedrooms: {
    question: {
      type: 'oneOption',
    },
    value: null,
    selection: null,
  },
  bathrooms: {
    question: {
      type: 'oneOption',
    },
    value: null,
    selection: null,
  },
  home: {
    question: {
      type: 'oneOption',
    },
    value: null,
    selection: null,
  },
  size: {
    question: {
      type: 'input',
    },
    value: null,
    selection: null,
  },
  rent: {
    question: {
      type: 'input',
    },
    value: null,
    selection: null,
  },
  priority: {
    question: {
      type: 'slider',
    },
    selection: null,
    value: null,
    categories: {
      beds: {
        value: null,
      },
      baths: {
        value: null,
      },
      home: {
        value: null,
      },
      size: {
        value: null,
      },
      rent: {
        value: null,
      },
    },
  },
}

export const rentalPreferencesSlice = createSlice({
  name: 'rentalPreferences',
  initialState: initialState,
  reducers: {
    setBedrooms: (
      state,
      action: PayloadAction<RentalPreferences['bedrooms']['value']>
    ) => {
      state['bedrooms']['value'] = action.payload
    },
    setBathrooms: (
      state,
      action: PayloadAction<RentalPreferences['bathrooms']['value']>
    ) => {
      state['bathrooms']['value'] = action.payload
    },
    setHome: (
      state,
      action: PayloadAction<RentalPreferences['home']['value']>
    ) => {
      state['home']['value'] = action.payload
    },
    setSize: (
      state,
      action: PayloadAction<{
        value: RentalPreferences['size']['value']
        selection: RentalPreferences['size']['selection']
      }>
    ) => {
      state['size']['value'] = action.payload.value
      state['size']['selection'] = action.payload.selection
    },
    setRent: (
      state,
      action: PayloadAction<{
        value: RentalPreferences['rent']['value']
        selection: RentalPreferences['rent']['selection']
      }>
    ) => {
      state['rent']['value'] = action.payload.value
      state['rent']['selection'] = action.payload.selection
    },
    setPriority: (
      state,
      action: PayloadAction<{
        category: keyof RentalPreferences['priority']['categories']
        value: RentalPreferences['priority']['categories'][keyof RentalPreferences['priority']['categories']]['value']
      }>
    ) => {
      state['priority']['categories'][action.payload.category]['value'] =
        action.payload.value
    },
  },
})

export const {
  setBedrooms,
  setBathrooms,
  setHome,
  setSize,
  setRent,
  setPriority,
} = rentalPreferencesSlice.actions

export default rentalPreferencesSlice.reducer
