import { Listing } from 'ratedrentals-types'
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

const SAVED_LISTINGS_LOCAL_STORAGE_KEY = 'saved-listings'

type ListingsDataReducerAction =
  | {
      type: 'add'
      payload: {
        id: string
      }
    }
  | {
      type: 'remove'
      payload: {
        id: string
      }
    }
  | {
      type: 'setListing'
      payload: {
        id: string
        listing: Listing
      }
    }

const SavedListingsContext = createContext<
  | {
      ids: string[]
      listings: (Listing | undefined)[]
      listingsData: ListingsData
      dispatchListingsData: Dispatch<ListingsDataReducerAction>
    }
  | undefined
>(undefined)

type ListingsData = { _id: string; listing: Listing | undefined }[]

const getListing = async (_id: string): Promise<Listing> => {
  return await fetch(`/api/listing/${_id}`)
    .then(response => response.json())
    .then(({ listing }) => {
      return listing
    })
}

const listingsDataReducer = (
  state: ListingsData,
  action: ListingsDataReducerAction
): ListingsData => {
  const id = action.payload.id
  switch (action.type) {
    case 'add':
      if (state.findIndex(listingData => listingData._id === id) === -1) {
        return [
          ...state,
          {
            _id: id,
            listing: undefined,
          },
        ]
      }
      return state
    case 'remove':
      return state.filter(listingData => listingData._id !== id)
    case 'setListing':
      return [
        ...state.filter(listingData => listingData._id !== id),
        {
          _id: id,
          listing: action.payload.listing,
        },
      ]
  }
}

const SavedListingsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [listingsData, dispatchListingsData] = useReducer(
    listingsDataReducer,
    []
  )
  const ids = useMemo(() => {
    return listingsData.map(listingData => listingData._id)
  }, [listingsData])
  const listings = useMemo(() => {
    return listingsData.map(listingData => listingData.listing)
  }, [listingsData])

  useEffect(() => {
    if (ids.length > 0) {
      try {
        localStorage.setItem(
          SAVED_LISTINGS_LOCAL_STORAGE_KEY,
          JSON.stringify(ids)
        )
      } catch (error) {}
    }
  }, [ids])

  const setListing = async (id: string) => {
    const listing = await getListing(id)
    dispatchListingsData({
      type: 'setListing',
      payload: {
        id: id,
        listing: listing,
      },
    })
  }

  useEffect(() => {
    ids.map(id => {
      if (!listingsData.find(listingData => listingData._id === id)?.listing) {
        setListing(id)
      }
    })
  }, [ids, listingsData])

  useEffect(() => {
    const fromLocalStorage: string[] = JSON.parse(
      localStorage.getItem(SAVED_LISTINGS_LOCAL_STORAGE_KEY) || '[]'
    )
    fromLocalStorage.forEach(id => {
      dispatchListingsData({
        type: 'add',
        payload: {
          id: id,
        },
      })
    })
  }, [])

  return (
    <SavedListingsContext.Provider
      value={{ ids, listings, listingsData, dispatchListingsData }}
    >
      {children}
    </SavedListingsContext.Provider>
  )
}

const useSavedListings = () => {
  const context = useContext(SavedListingsContext)
  if (context === undefined) {
    throw new Error(
      'useSavedListings must be used with a SavedListingsProvider'
    )
  }
  return context
}

export { SavedListingsProvider, useSavedListings }
