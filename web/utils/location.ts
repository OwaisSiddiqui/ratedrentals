const GOOGLE_GEOCODING_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY
if (!GOOGLE_GEOCODING_API_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY not defined')
}

export const convertLatLngToLocation = async (
  lat: number,
  lng: number
): Promise<string> => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODING_API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      return data.plus_code.compound_code
    })
}

const GOOGLE_GEOLOCATION_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_GEOLOCATION_API_KEY
if (!GOOGLE_GEOLOCATION_API_KEY) {
  throw new Error('NEXT_PUBLIC_GOOGLE_GEOLOCATION_API_KEY not defined')
}

export const getUserLatLng = async (): Promise<{
  lat: number
  lng: number
}> => {
  return fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOCATION_API_KEY}`,
    {
      method: 'post',
    }
  )
    .then(response => response.json())
    .then(data => {
      return { lat: data.location.lat, lng: data.location.lng }
    })
}
