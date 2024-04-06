import { useEffect, useState } from 'react'
import * as S from './styles'
import { Listing } from 'ratedrentals-types'
import { Map, MapType, Marker } from 'mapkit-react';

const APPLE_MAPS_TOKEN = `eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlI4OVVSUVNHQ0YifQ.eyJpc3MiOiJQMjRNNFVYODNTIiwiaWF0IjoxNzEyMzcxNDE5LCJleHAiOjE3MjUyMzUyMDB9.inEiAcRl10a5CBgUu5bZrMKdgtAGiJVQjWqAtWUG4Na3KPSgkQnFpem4YmE4nho1_ga7mNbPsoMXXCbQvDaOfg
`

interface LatLng {
  lat: number | null
  lng: number | null
}

const AppleMap = ({
  coordinates,
  id,
}: {
  coordinates: Listing['property']['location']['coordinates']
  id: string
}) => {
  const [latAndLng, setLatAndLng] = useState<LatLng>({lat: coordinates.lat, lng: coordinates.lng})

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
        setLatAndLng({
            lat: coordinates.lat,
            lng: coordinates.lng
        })
    }
  }, [coordinates])

  return (
    <>
        {latAndLng.lat && latAndLng.lng && (
                <Map mapType={MapType.Hybrid} token={APPLE_MAPS_TOKEN} initialRegion={{centerLatitude: latAndLng.lat, centerLongitude: latAndLng.lng, latitudeDelta: 0.001, longitudeDelta: 0.001}}>
                    <Marker latitude={latAndLng.lat} longitude={latAndLng.lng} />
                </Map>
            )
        }
    </>
  );
}

export default AppleMap
