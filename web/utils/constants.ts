import {
  AllUtilitiesBadge,
  Devices,
  PetFriendlyBadge,
  PromotionBadge,
  Questions,
  ScreenSizes,
  TorontoCity,
} from 'ratedrentals-types'
import { AvailableCities } from 'ratedrentals-types'

export const COMPANY_NAME = 'RatedRentals'
export const COMPANY_NAME_WITH_DOMAIN_EXTENSION = `${COMPANY_NAME}.ca`
export const UNAVAILABLE_SYMBOL = '--'
export const QUESTIONS: Questions = [
  {
    value: 'How many bedrooms would you like?',
    type: 'oneOption',
    category: {
      value: 'bedrooms',
      display: 'bedrooms',
      slug: 'beds',
    },
    options: [
      {
        value: 'any',
        display: 'Any',
        slug: 'any',
      },
      {
        value: 1,
        display: 1,
        slug: 1,
      },
      {
        value: 2,
        display: 2,
        slug: 2,
      },
      {
        value: 3,
        display: 3,
        slug: 3,
      },
      {
        value: 4,
        display: 4,
        slug: 4,
      },
    ],
    mandatory: true,
  },
  {
    value: 'How many bathrooms would you like?',
    type: 'oneOption',
    category: {
      value: 'bathrooms',
      display: 'bathrooms',
      slug: 'baths',
    },
    options: [
      {
        value: 'any',
        display: 'Any',
        slug: 'any',
      },
      {
        value: 1,
        display: 1,
        slug: 1,
      },
      {
        value: 1.5,
        display: 1.5,
        slug: 1.5,
      },
      {
        value: 2,
        display: 2,
        slug: 2,
      },
      {
        value: 2.5,
        display: 2.5,
        slug: 2.5,
      },
      {
        value: 3,
        display: 3,
        slug: 3,
      },
    ],
    mandatory: true,
  },
  {
    value: 'What type of home would you like to live in?',
    type: 'oneOption',
    category: {
      value: 'home',
      display: 'home',
      slug: 'home',
    },
    options: [
      {
        value: 'any',
        display: 'Any',
        slug: 'any',
      },
      {
        value: 'house',
        display: 'House',
        slug: 'house',
      },
      {
        value: 'condo',
        display: 'Condo',
        slug: 'condo',
      },
      {
        value: 'apartment',
        display: 'Apartment',
        slug: 'apartment',
      },
      {
        value: 'townHouse',
        display: 'Town House',
        slug: 'town-house',
      },
      {
        value: 'privateRoom',
        display: 'Private Room',
        slug: 'private-room',
      },
      {
        value: 'basement',
        display: 'Basement',
        slug: 'basement',
      },
      {
        value: 'multiUnit',
        display: 'Multi-unit',
        slug: 'multi-unit',
      },
      {
        value: 'duplex',
        display: 'Duplex',
        slug: 'duplex',
      },
      {
        value: 'bachelor',
        display: 'Bachelor',
        slug: 'bachelor',
      },
      {
        value: 'studio',
        display: 'Studio',
        slug: 'studio',
      },
      {
        value: 'sharedRoom',
        display: 'Shared Room',
        slug: 'shared-room',
      },
    ],
    mandatory: true,
  },
  {
    value: `What size (in square feet) would you like?`,
    type: 'input',
    category: {
      value: 'size',
      display: 'size (in square feet)',
      slug: 'size',
    },
    options: [
      {
        value: 'any',
        display: 'Any',
        slug: 'any',
        hasInput: false,
      },
      {
        value: 'biggestSize',
        display: 'Biggest size',
        slug: 'biggest-size',
        hasInput: false,
      },
      {
        value: 'customSize',
        display: 'Custom size',
        hasInput: true,
        slug: null,
      },
    ],
    unit: {
      value: 'sqft',
      isLeft: false,
    },
    mandatory: true,
  },
  {
    value: 'What rent (per month) would you like to pay?',
    type: 'input',
    category: {
      value: 'rent',
      display: 'rent (per month)',
      slug: 'rent',
    },
    options: [
      {
        value: 'any',
        display: 'Any',
        slug: 'any',
        hasInput: false,
      },
      {
        value: 'lowestRent',
        display: 'Lowest rent',
        slug: 'lowest-rent',
        hasInput: false,
      },
      {
        value: 'customRent',
        display: 'Custom rent',
        hasInput: true,
        slug: null,
      },
    ],
    unit: {
      value: '$',
      isLeft: true,
    },
    mandatory: true,
  },
  {
    value: 'Rate the priority for each of the categories listed:',
    type: 'slider',
    category: {
      value: 'priority',
      display: 'priority',
      slug: 'priority',
    },
    options: [
      {
        label: {
          display: 'Number of Beds',
          value: 'numberOfBeds',
        },
        value: 'bedsPriority',
        slug: 'beds-priority',
        category: {
          value: 'beds',
        },
      },
      {
        label: {
          display: 'Number of Baths',
          value: 'numberOfBaths',
        },
        value: 'bathsPriority',
        slug: 'baths-priority',
        category: {
          value: 'baths',
        },
      },
      {
        label: {
          display: 'Home type',
          value: 'homeType',
        },
        value: 'homeType',
        slug: 'home-priority',
        category: {
          value: 'home',
        },
      },
      {
        label: {
          display: 'Rent',
          value: 'rent',
        },
        value: 'rentPriority',
        slug: 'rent-priority',
        category: {
          value: 'rent',
        },
      },
      {
        label: {
          display: 'Size (in square feet)',
          value: 'size',
        },
        value: 'sizePriority',
        slug: 'size-priority',
        category: {
          value: 'size',
        },
      },
    ],
    mandatory: false,
  },
]
export const CITIES: AvailableCities[] = [
  {
    name: {
      value: 'mississauga',
      display: 'Mississauga',
      dbName: 'mississauga',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'hamilton',
      display: 'Hamilton',
      dbName: 'hamilton',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'brampton',
      display: 'Brampton',
      dbName: 'brampton',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'ottawa',
      display: 'Ottawa',
      dbName: 'ottawa',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'london',
      display: 'London',
      dbName: 'london',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'vaughan',
      display: 'Vaughan',
      dbName: 'vaughan',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'kitchener',
      display: 'Kitchener',
      dbName: 'kitchener',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'windsor',
      display: 'Windsor',
      dbName: 'windsor-on',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
  {
    name: {
      value: 'markham',
      display: 'Markham',
      dbName: 'markham',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
]
export const screenSizes: ScreenSizes = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}
export const devices: Devices = {
  mobile: '(min-width: 576px)',
  tabletS: '(min-width: 768px)',
  tablet: '(min-width: 992px)',
  desktopS: '(min-width: 1200px)',
  desktop: '(min-width: 1400px)',
}
export const UNAVAILABLE_CIITIES: TorontoCity[] = [
  {
    name: {
      value: 'toronto',
      display: 'Toronto',
      dbName: 'toronto',
    },
    state: {
      value: 'ontario',
      shortForm: {
        value: 'on',
        display: 'ON',
      },
    },
    country: 'canada',
  },
]
export const BADGES: {
  petFriendly: PetFriendlyBadge
  allUtilities: AllUtilitiesBadge
  promotions: PromotionBadge
} = {
  petFriendly: {
    name: 'Pet friendly',
    colors: {
      background: 'hsl(75, 99%, 54%)',
      text: 'hsl(75, 99%, 14%)',
    },
  },
  allUtilities: {
    name: 'All utilities incld.',
    colors: {
      background: 'hsl(195, 100%, 54%)',
      text: 'hsl(195, 100%, 14%)',
    },
  },
  promotions: {
    name: 'Promotions',
    colors: {
      background: 'hsl(44, 100%, 54%)',
      text: 'hsl(44, 100%, 14%)',
    },
  },
}
