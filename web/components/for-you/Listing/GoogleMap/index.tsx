import { useEffect, useState } from 'react'
import * as S from './styles'
import { Loader } from '@googlemaps/js-api-loader'
import { Listing } from 'ratedrentals-types'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
if (!GOOGLE_MAPS_API_KEY) {
  throw new Error('GOOGLE_MAPS_API_KEY not defined')
}

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
})

interface LatLng {
  lat: number
  lng: number
}

const GoogleMap = ({
  coordinates,
  id,
}: {
  coordinates: Listing['property']['location']['coordinates']
  id: string
}) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()
  const [latAndLng, setLatAndLng] = useState<LatLng>()

  useEffect(() => {
    setLatAndLng({
      lat: coordinates.lat ?? -33.91722,
      lng: coordinates.lng ?? 151.23064,
    })
  }, [coordinates])

  useEffect(() => {
    const initGoogleMap = () => {
      loader
        .load()
        .then(() => {
          const elm = document.getElementById(`map-${id}`)
          if (elm) {
            const googleMap = new google.maps.Map(elm, {
              center: new google.maps.LatLng(-33.91722, 151.23064),
              zoom: 19,
              mapTypeId: google.maps.MapTypeId.HYBRID,
            })
            setGoogleMap(googleMap)
            return googleMap
          }
        })
        .then(googleMap => {
          setMarker(
            new window.google.maps.Marker({
              position: new google.maps.LatLng(43.642567, -79.387054),
              map: googleMap,
            })
          )
        })
    }

    initGoogleMap()
  }, [id])

  useEffect(() => {
    const changeMarkerPosition = (
      googleMap: google.maps.Map,
      marker: google.maps.Marker,
      latLng: LatLng
    ) => {
      const googleMapLatLng = new google.maps.LatLng(latLng.lat, latLng.lng)
      googleMap.setCenter(googleMapLatLng)
      marker.setPosition(googleMapLatLng)
    }

    if (googleMap && marker && latAndLng && latAndLng.lat && latAndLng.lng) {
      changeMarkerPosition(googleMap, marker, latAndLng)
    }
  }, [googleMap, marker, latAndLng])

  return <S.Container id={`map-${id}`} />
}

export default GoogleMap
