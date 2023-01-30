import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import searchIcon from '@/public/icons/magnifying-glass.svg'
import locationIcon from '@/public/icons/map-marker.svg'
import * as S from './styles'
import { AvailableCities, SearchbarType } from 'ratedrentals-types'
import { CITIES } from '@/utils/constants'
import { useAppDispatch } from '@/redux/hooks'
import { setCity } from '@/redux/slices/citySlice'
import { getCityUrl } from '@/utils/url'
import { useRouter } from 'next/router'
import { getPreferencesUrl } from '@/utils/url'
import MapMarker from '@/components/global/icons/MapMarker'
import MagnifyingGlass from '@/components/global/icons/MagnifyingGlass'

const MAX_RESULTS = 5

const SuggestionComponent = ({
  city,
  data,
  clearSearchbarValue,
}: {
  city: AvailableCities
  data: { type: 'home' } | { type: 'city'; page: number }
  clearSearchbarValue: () => void
}) => {
  return (
    <Link
      href={
        data.type === 'home'
          ? getPreferencesUrl({ city: city })
          : getCityUrl({ city: city, page: data.page })
      }
      passHref
      shallow={data.type === 'city'}
    >
      <S.Suggestion
        as='a'
        onClick={() => {
          clearSearchbarValue()
        }}
      >
        <S.LocationIconWrapper>
          <MapMarker size={{ width: 13, height: 13 }} />
        </S.LocationIconWrapper>
        <S.SuggestionText noSuggestions={false}>
          <S.City>{city.name.display},</S.City>
          <S.State>{city.state.shortForm.display}</S.State>
        </S.SuggestionText>
      </S.Suggestion>
    </Link>
  )
}

const NoSuggestionComponent = ({ message }: { message: string }) => {
  return (
    <Link href='/?available-cities' shallow>
      <S.Suggestion>
        <S.SuggestionText noSuggestions>{message}</S.SuggestionText>
      </S.Suggestion>
    </Link>
  )
}

const Searchbar = ({
  data,
}: {
  data: { type: 'home' } | { type: 'city'; page: number }
}) => {
  const [suggestions, setSuggestions] = useState<AvailableCities[]>([])
  const [searchbarValue, setSearchbarValue] = useState('')
  const [isSearchbarInputFocused, setIsSearchbarInputFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const type = useMemo(() => {
    return data.type
  }, [data])

  const autocomplete = (input: string) => {
    let results: AvailableCities[] = []
    let regexString = `${input.trim()}.*`
    let regex = new RegExp(regexString, 'i')
    for (let i = 0; i < CITIES.length; i++) {
      let city = CITIES[i]
      let result = `${city.name.display} ${city.state}`
      let match = regex.test(result.toLowerCase())
      if (match) {
        results.push(city)
      }
    }
    return results.slice(0, MAX_RESULTS)
  }

  useEffect(() => {
    setSuggestions(autocomplete(searchbarValue))
  }, [searchbarValue])

  useEffect(() => {
    setShowSuggestions(!!searchbarValue)
  }, [searchbarValue, suggestions])

  return (
    <S.Container
      type={type}
      isSearchbarInputFocused={isSearchbarInputFocused}
      isSuggestions={showSuggestions}
    >
      <S.SearchBarInputForm
        type={type}
        onSubmit={e => {
          e.preventDefault()
          e.currentTarget.reset()
          return false
        }}
        isSuggestions={showSuggestions}
      >
        <S.SearchIconSection>
          <MagnifyingGlass size={{ width: 14, height: 14 }} />
        </S.SearchIconSection>
        <label htmlFor='searchbar' />
        <S.SearchbarInput
          autoComplete='off'
          onChange={event => {
            setSearchbarValue(event.target.value)
          }}
          type='search'
          placeholder='Search for a city'
          name='searchbar'
          id='searchbar'
          spellCheck={false}
          onFocus={() => {
            setIsSearchbarInputFocused(true)
          }}
          onBlur={() => {
            setIsSearchbarInputFocused(false)
          }}
          value={searchbarValue}
        />
      </S.SearchBarInputForm>
      <S.Suggestions type={type} show={showSuggestions}>
        {suggestions.map((suggestion, index) => {
          return (
            <SuggestionComponent
              clearSearchbarValue={() => {
                setSearchbarValue('')
              }}
              data={data}
              key={index}
              city={suggestion}
            />
          )
        })}
        {suggestions.length === 0 ? (
          <NoSuggestionComponent
            message={`'${searchbarValue}' city could not be found and is likely not available. Click here to see list of available cities.`}
          />
        ) : null}
      </S.Suggestions>
    </S.Container>
  )
}

export default Searchbar
