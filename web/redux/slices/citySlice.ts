import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AvailableCities } from 'ratedrentals-types'

type CityState = AvailableCities | null

const initialState: CityState = null

export const cityPreferenceSlice = createSlice({
  name: 'cityPreference',
  initialState: initialState as CityState,
  reducers: {
    setCity: (state, action: PayloadAction<AvailableCities>) => {
      return action.payload
    },
  },
})

export const { setCity } = cityPreferenceSlice.actions

export default cityPreferenceSlice.reducer
