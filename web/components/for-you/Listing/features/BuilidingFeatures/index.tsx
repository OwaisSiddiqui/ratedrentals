import { useAppSelector } from '@/redux/hooks'
import { Listing } from 'ratedrentals-types'
import Features from '../shared'

const BuildingFeatures = ({
  features,
}: {
  features: Listing['property']['features']['building']
}) => {
  return <Features title={'Building Features'} features={features} />
}

export default BuildingFeatures
