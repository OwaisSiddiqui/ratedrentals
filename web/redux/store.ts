import { configureStore } from '@reduxjs/toolkit'
import rentalPreferencesReducer from '@/redux/slices/rentalPreferencesSlice'
import cityReducer from '@/redux/slices/citySlice'

export const store = configureStore({
  reducer: {
    rentalPreferences: rentalPreferencesReducer,
    city: cityReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
