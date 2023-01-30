declare module 'ratedrentals-types' {
  export interface OntarioCity {
    state: {
      value: 'ontario'
      shortForm: {
        value: 'on'
        display: 'ON'
      }
    }
    country: 'canada'
  }

  export interface TorontoCity extends OntarioCity {
    name: {
      value: 'toronto'
      display: 'Toronto'
      dbName: 'toronto'
    }
  }

  export interface MississaugaCity extends OntarioCity {
    name: {
      value: 'mississauga'
      display: 'Mississauga'
      dbName: 'mississauga'
    }
  }

  export interface HamiltonCity extends OntarioCity {
    name: {
      value: 'hamilton'
      display: 'Hamilton'
      dbName: 'hamilton'
    }
  }
  export interface BramptonCity extends OntarioCity {
    name: {
      value: 'brampton'
      display: 'Brampton'
      dbName: 'brampton'
    }
  }

  export interface OttawaCity extends OntarioCity {
    name: {
      value: 'ottawa'
      display: 'Ottawa'
      dbName: 'ottawa'
    }
  }

  export interface LondonCity extends OntarioCity {
    name: {
      value: 'london'
      display: 'London'
      dbName: 'london'
    }
  }

  export interface VaughanCity extends OntarioCity {
    name: {
      value: 'vaughan'
      display: 'Vaughan'
      dbName: 'vaughan'
    }
  }

  export interface KitchenerCity extends OntarioCity {
    name: {
      value: 'kitchener'
      display: 'Kitchener'
      dbName: 'kitchener'
    }
  }

  export interface WindsorCity extends OntarioCity {
    name: {
      value: 'windsor'
      display: 'Windsor'
      dbName: 'windsor-on'
    }
  }

  export interface MarkhamCity extends OntarioCity {
    name: {
      value: 'markham'
      display: 'Markham'
      dbName: 'markham'
    }
  }

  export type AvailableCities =
    | MississaugaCity
    | HamiltonCity
    | BramptonCity
    | OttawaCity
    | LondonCity
    | VaughanCity
    | KitchenerCity
    | MarkhamCity
    | WindsorCity

  export type UnavailableCities = TorontoCity

  export interface OneOptionQuestion {
    type: 'oneOption'
    mandatory: true
  }

  export interface InputQuestion {
    type: 'input'
    mandatory: true
  }

  export interface BedroomQuestion extends OneOptionQuestion {
    value: `How many ${BedroomQuestion['category']['value']} would you like?`
    category: {
      value: 'bedrooms'
      display: 'bedrooms'
      slug: 'beds'
    }
    options: [
      {
        value: 'any'
        display: 'Any'
        slug: 'any'
      },
      {
        value: 1
        display: 1
        slug: 1
      },
      {
        value: 2
        display: 2
        slug: 2
      },
      {
        value: 3
        display: 3
        slug: 3
      },
      {
        value: 4
        display: 4
        slug: 4
      }
    ]
  }

  export interface BathroomQuestion extends OneOptionQuestion {
    value: `How many ${BathroomQuestion['category']['value']} would you like?`
    category: {
      value: 'bathrooms'
      display: 'bathrooms'
      slug: 'baths'
    }
    options: [
      {
        value: 'any'
        display: 'Any'
        slug: 'any'
      },
      {
        value: 1
        display: 1
        slug: 1
      },
      {
        value: 1.5
        display: 1.5
        slug: 1.5
      },
      {
        value: 2
        display: 2
        slug: 2
      },
      {
        value: 2.5
        display: 2.5
        slug: 2.5
      },
      {
        value: 3
        display: 3
        slug: 3
      }
    ]
  }

  export interface HomeQuestion extends OneOptionQuestion {
    value: `What type of ${HomeQuestion['category']['value']} would you like to live in?`
    category: {
      value: 'home'
      display: 'home'
      slug: 'home'
    }
    options: [
      {
        value: 'any'
        display: 'Any'
        slug: 'any'
      },
      {
        value: 'house'
        display: 'House'
        slug: 'house'
      },
      {
        value: 'condo'
        display: 'Condo'
        slug: 'condo'
      },
      {
        value: 'apartment'
        display: 'Apartment'
        slug: 'apartment'
      },
      {
        value: 'townHouse'
        display: 'Town House'
        slug: 'town-house'
      },
      {
        value: 'privateRoom'
        display: 'Private Room'
        slug: 'private-room'
      },
      {
        value: 'basement'
        display: 'Basement'
        slug: 'basement'
      },
      {
        value: 'multiUnit'
        display: 'Multi-unit'
        slug: 'multi-unit'
      },
      {
        value: 'duplex'
        display: 'Duplex'
        slug: 'duplex'
      },
      {
        value: 'bachelor'
        display: 'Bachelor'
        slug: 'bachelor'
      },
      {
        value: 'studio'
        display: 'Studio'
        slug: 'studio'
      },
      {
        value: 'sharedRoom'
        display: 'Shared Room'
        slug: 'shared-room'
      }
    ]
  }

  export interface SizeQuestion extends InputQuestion {
    value: `What ${SizeQuestion['category']['display']} would you like?`
    category: {
      value: 'size'
      display: 'size (in square feet)'
      slug: 'size'
    }
    options: [
      {
        value: 'any'
        display: 'Any'
        slug: 'any'
        hasInput: false
      },
      {
        value: 'biggestSize'
        display: 'Biggest size'
        slug: 'biggest-size'
        hasInput: false
      },
      {
        value: 'customSize'
        display: 'Custom size'
        hasInput: true
        slug: null
      }
    ]
    unit: {
      value: 'sqft'
      isLeft: false
    }
  }

  export interface RentQuestion extends InputQuestion {
    value: `What ${RentQuestion['category']['display']} would you like to pay?`
    category: {
      value: 'rent'
      display: 'rent (per month)'
      slug: 'rent'
    }
    options: [
      {
        value: 'any'
        display: 'Any'
        slug: 'any'
        hasInput: false
      },
      {
        value: 'lowestRent'
        display: 'Lowest rent'
        slug: 'lowest-rent'
        hasInput: false
      },
      {
        value: 'customRent'
        display: 'Custom rent'
        hasInput: true
        slug: null
      }
    ]
    unit: {
      value: '$'
      isLeft: true
    }
  }

  export interface PriorityQuestion {
    value: `Rate the ${PriorityQuestion['category']['value']} for each of the categories listed:`
    type: 'slider'
    category: {
      value: 'priority'
      display: 'priority'
      slug: 'priority'
    }
    options: [
      {
        label: {
          value: 'numberOfBeds'
          display: 'Number of Beds'
        }
        value: 'bedsPriority'
        slug: 'beds-priority'
        category: {
          value: 'beds'
        }
      },
      {
        label: {
          display: 'Number of Baths'
          value: 'numberOfBaths'
        }
        value: 'bathsPriority'
        slug: 'baths-priority'
        category: {
          value: 'baths'
        }
      },
      {
        label: {
          display: 'Home type'
          value: 'homeType'
        }
        value: 'homeType'
        slug: 'home-priority'
        category: {
          value: 'home'
        }
      },
      {
        label: {
          value: 'rent'
          display: 'Rent'
        }
        value: 'rentPriority'
        slug: 'rent-priority'
        category: {
          value: 'rent'
        }
      },
      {
        label: {
          display: 'Size (in square feet)'
          value: 'size'
        }
        value: 'sizePriority'
        slug: 'size-priority'
        category: {
          value: 'size'
        }
      }
    ]
    mandatory: false
  }

  export type Questions = (
    | BedroomQuestion
    | BathroomQuestion
    | HomeQuestion
    | SizeQuestion
    | RentQuestion
    | PriorityQuestion
  )[]

  type PriorityOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

  export interface RentalPreferences {
    bedrooms: {
      question: {
        type: BedroomQuestion['type']
      }
      value: BedroomQuestion['options'][number]['value'] | null
      selection: null
    }
    bathrooms: {
      question: {
        type: BathroomQuestion['type']
      }
      value: BathroomQuestion['options'][number]['value'] | null
      selection: null
    }
    home: {
      question: {
        type: HomeQuestion['type']
      }
      value: HomeQuestion['options'][number]['value'] | null
      selection: null
    }
    size: {
      question: {
        type: SizeQuestion['type']
      }
      value: SizeQuestion['options'][number]['value'] | number | null
      selection: SizeQuestion['options'][number]['value'] | null
    }

    rent: {
      question: {
        type: RentQuestion['type']
      }
      value: RentQuestion['options'][number]['value'] | number | null
      selection: RentQuestion['options'][number]['value'] | null
    }
    priority: {
      question: {
        type: PriorityQuestion['type']
      }
      selection: null
      value: null
      categories: {
        beds: {
          value: PriorityOptions | null
        }
        baths: {
          value: PriorityOptions | null
        }
        home: {
          value: PriorityOptions | null
        }
        size: {
          value: PriorityOptions | null
        }
        rent: {
          value: PriorityOptions | null
        }
      }
    }
    [type: keyof RentalPreferences]: RentalPreferences[keyof RentalPreferences]
  }

  export interface SlugRentalPreferences {
    beds?: BedroomQuestion['options'][number]['slug']
    baths?: BathroomQuestion['options'][number]['slug']
    home?: HomeQuestion['options'][number]['slug']
    size?: SizeQuestion['options'][number]['slug'] | number
    rent?: RentQuestion['options'][number]['slug'] | number
    'beds-priority'?: PriorityOptions
    'baths-priority'?: PriorityOptions
    'rent-priority'?: PriorityOptions
    'size-priority'?: PriorityOptions
    [
      type: keyof SlugRentalPreferences
    ]: SlugRentalPreferences[keyof SlugRentalPreferences]
  }

  export interface Listing {
    // Would like to do type Date but it is not JSON serializable data types for getServiceSideProps
    date: {
      created: string | null
      updated: string | null
    }
    _id: string
    promotions: {
      title: string | null
      description: string | null
    }[]
    property: {
      housing: string | null
      location: {
        coordinates: {
          lat: number | null
          lng: number | null
        }
        address: {
          value: string | null
          slug: string | null
        }
        region: {
          value: string | null
          city: string | null
          province: {
            code: string | null
            value: string | null
          }
          postalCode: string | null
        }
      }
      tours: {
        name: string | null
        provider: string | null
        id: string | null
      }[]
      photos: {
        alt: string
        scales: {
          large: {
            url: string
            size: {
              width: string
              height: string
            }
          }
          medium: {
            url: string
            size: {
              width: string
              height: string
            }
          }
          small: {
            url: string
            size: {
              width: string
              height: string
            }
          }
        }
      }[]
      properties: {
        beds: number | null
        baths: number | null
        size: number | null
        type: string | null
        petFriendly: boolean | null
        furnished: boolean | null
        parkingType: string | null
      }
      legal: {
        lease: {
          term: string | null
          short: boolean | null
        }
        utilities: string[]
        rent: number | null
      }
      features: {
        unit: string[]
        building: string[]
      }
      nearbyAmenities: string[]
    }
    url: string
    poster: {
      email: string | null
      phone: string | null
      name: string | null
    }
    description: string | null
    meta: {
      daysAgo: number
    }
  }

  export interface Pages {
    totalPages: number
    listingsPerPage: number
    neighbours: number
    totalListings: number
    maxPages: number
  }

  export type RankedListing = { _id: string; score: number; updated: string }

  export interface Match {
    listing: Listing
    rank: number
  }

  export interface ScreenSizes {
    sm: '576px'
    md: '768px'
    lg: '992px'
    xl: '1200px'
    xxl: '1400px'
  }
  export interface Devices {
    mobile: `(min-width: ${ScreenSizes['sm']})`
    tabletS: `(min-width: ${ScreenSizes['md']})`
    tablet: `(min-width: ${ScreenSizes['lg']})`
    desktopS: `(min-width: ${ScreenSizes['xl']})`
    desktop: `(min-width: ${ScreenSizes['xxl']})`
  }

  export type SearchbarType = 'home' | 'city'

  export type Badges = (PetFriendlyBadge | AllUtilitiesBadge | PromotionBadge)[]

  export interface PetFriendlyBadge {
    name: 'Pet friendly'
    colors: {
      background: 'hsl(75, 99%, 54%)'
      text: 'hsl(75, 99%, 14%)'
    }
  }

  export interface PromotionBadge {
    name: 'Promotions'
    colors: {
      background: 'hsl(44, 100%, 54%)'
      text: 'hsl(44, 100%, 14%)'
    }
  }

  export interface AllUtilitiesBadge {
    name: 'All utilities incld.'
    colors: {
      background: 'hsl(195, 100%, 54%)'
      text: 'hsl(195, 100%, 14%)'
    }
  }
}
