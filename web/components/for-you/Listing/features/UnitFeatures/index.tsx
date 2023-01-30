import { Listing } from 'ratedrentals-types'
import Features from '../shared'

const UnitFeatures = ({
  features,
}: {
  features: Listing['property']['features']['unit']
}) => {
  return <Features title={'Unit Features'} features={features} />
}

export default UnitFeatures
