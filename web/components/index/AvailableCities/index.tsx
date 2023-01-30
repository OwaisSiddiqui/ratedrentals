import { CITIES } from '@/utils/constants'
import { getMatchesURL } from '@/utils/url'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as S from './styles'

const AvailableCities = () => {
  const router = useRouter()

  return (
    <S.Background
      onClick={e => {
        e.stopPropagation()
        router.push('/', undefined, { shallow: true })
      }}
    >
      <S.MarginWrapper
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <S.Container>
          <S.Heading>
            <S.Title>Available Cities</S.Title>
            <S.Description>
              This is a list of currently available cities on RatedRentals.
            </S.Description>
          </S.Heading>

          <S.AvailableCities>
            {CITIES.map((city, i) => {
              return (
                <S.AvailableCityLi key={i}>
                  <Link
                    href={getMatchesURL({
                      city: city,
                    })}
                    passHref
                  >
                    <S.AvailableCity>
                      {city.name.display}, {city.state.shortForm.display}
                    </S.AvailableCity>
                  </Link>
                </S.AvailableCityLi>
              )
            })}
          </S.AvailableCities>
        </S.Container>
      </S.MarginWrapper>
    </S.Background>
  )
}

export default AvailableCities
