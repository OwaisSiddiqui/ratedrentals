import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

const VIEWED_LISTINGS_LOCAL_STORAGE_KEY = 'viewed-listings'

type ListingsDataReducerAction =
  | {
      type: 'add'
      payload: {
        id: string
        time: number
      }
    }
  | {
      type: 'set'
      payload: {
        listingsData: ListingsData
      }
    }

const ViewedListingsContext = createContext<
  | {
      ids: string[] | null
      dispatchListingsData: Dispatch<ListingsDataReducerAction>
    }
  | undefined
>(undefined)

type ListingsData = { _id: string; time: number }[] | null

const listingsDataReducer = (
  state: ListingsData,
  action: ListingsDataReducerAction
): ListingsData => {
  switch (action.type) {
    case 'add':
      const id = action.payload.id
      if (!state) {
        return [
          {
            _id: id,
            time: action.payload.time,
          },
        ]
      } else if (
        state.findIndex(listingData => listingData._id === id) === -1
      ) {
        return [
          ...state,
          {
            _id: id,
            time: action.payload.time,
          },
        ]
      } else {
        return state
      }
    case 'set':
      return action.payload.listingsData
  }
}

const ViewedListingsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [listingsData, dispatchListingsData] = useReducer(
    listingsDataReducer,
    null
  )
  const ids = useMemo<string[] | null>(() => {
    if (listingsData) {
      return listingsData.map(listingData => listingData._id)
    }
    return null
  }, [listingsData])

  useEffect(() => {
    if (listingsData && listingsData.length > 0) {
      localStorage.setItem(
        VIEWED_LISTINGS_LOCAL_STORAGE_KEY,
        JSON.stringify(listingsData)
      )
    }
  }, [listingsData])

  useEffect(() => {
    const fromLocalStorage: any[] = JSON.parse(
      localStorage.getItem(VIEWED_LISTINGS_LOCAL_STORAGE_KEY) || '[]'
    )
    if (fromLocalStorage.length > 0) {
      fromLocalStorage.forEach(viewedListingData => {
        dispatchListingsData({
          type: 'add',
          payload: {
            id: viewedListingData._id,
            time: viewedListingData.time,
          },
        })
      })
    } else {
      dispatchListingsData({
        type: 'set',
        payload: {
          listingsData: [],
        },
      })
    }
  }, [])

  return (
    <ViewedListingsContext.Provider value={{ ids, dispatchListingsData }}>
      {children}
    </ViewedListingsContext.Provider>
  )
}

const useViewedListings = () => {
  const context = useContext(ViewedListingsContext)
  if (context === undefined) {
    throw new Error(
      'useViewedListings must be used with a ViewedListingsProvider'
    )
  }
  return context
}

export { ViewedListingsProvider, useViewedListings }
