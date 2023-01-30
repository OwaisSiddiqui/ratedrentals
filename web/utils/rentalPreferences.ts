import {
  RentalPreferences,
  SlugRentalPreferences,
  BedroomQuestion,
  BathroomQuestion,
  SizeQuestion,
  RentQuestion,
  HomeQuestion,
} from 'ratedrentals-types'
import { QUESTIONS } from '@/utils/constants'

export const convertToRentalPreferences = (
  slugRentalPreferences: SlugRentalPreferences
) => {
  const rentalPreferences: RentalPreferences = {
    bedrooms: {
      question: {
        type: 'oneOption',
      },
      value: null,
      selection: null,
    },
    bathrooms: {
      question: {
        type: 'oneOption',
      },
      value: null,
      selection: null,
    },
    home: {
      question: {
        type: 'oneOption',
      },
      value: null,
      selection: null,
    },
    size: {
      question: {
        type: 'input',
      },
      value: null,
      selection: null,
    },
    rent: {
      question: {
        type: 'input',
      },
      value: null,
      selection: null,
    },
    priority: {
      question: {
        type: 'slider',
      },
      selection: null,
      value: null,
      categories: {
        beds: {
          value: null,
        },
        baths: {
          value: null,
        },
        home: {
          value: null,
        },
        size: {
          value: null,
        },
        rent: {
          value: null,
        },
      },
    },
  }

  if (
    slugRentalPreferences['beds'] &&
    !isNaN(Number(slugRentalPreferences['beds'])) &&
    slugRentalPreferences['beds'] >= 1 &&
    slugRentalPreferences['beds'] <= 4
  ) {
    rentalPreferences['bedrooms'].value = slugRentalPreferences['beds'] as
      | 1
      | 2
      | 3
      | 4
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'bedrooms')
        ?.options as BedroomQuestion['options']
    ).find(option => option.slug === slugRentalPreferences['beds'])?.value
    if (result) {
      rentalPreferences['bedrooms'].value = result
    }
  }

  if (
    slugRentalPreferences['baths'] &&
    !isNaN(Number(slugRentalPreferences['baths'])) &&
    slugRentalPreferences['baths'] >= 1 &&
    slugRentalPreferences['baths'] <= 3
  ) {
    rentalPreferences['bathrooms'].value = slugRentalPreferences['baths'] as
      | 1
      | 1.5
      | 2
      | 2.5
      | 3
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'bathrooms')
        ?.options as BathroomQuestion['options']
    ).find(option => option.slug === slugRentalPreferences['baths'])?.value
    if (result) {
      rentalPreferences['bathrooms'].value = result
    }
  }

  let result = null

  result = (
    QUESTIONS.find(question => question.category.value === 'home')
      ?.options as HomeQuestion['options']
  ).find(option => option.slug === slugRentalPreferences['home'])?.value
  if (result) {
    rentalPreferences['home'].value = result
  }

  if (
    slugRentalPreferences['size'] &&
    !isNaN(Number(slugRentalPreferences['size']))
  ) {
    rentalPreferences['size'].value = slugRentalPreferences['size'] as number
    rentalPreferences['size'].selection = 'customSize'
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'size')
        ?.options as SizeQuestion['options']
    ).find(option => option.slug === slugRentalPreferences['size'])?.value
    if (result) {
      rentalPreferences['size'].value = result
      rentalPreferences['size'].selection = result
    }
  }

  if (
    slugRentalPreferences['rent'] &&
    !isNaN(Number(slugRentalPreferences['rent']))
  ) {
    rentalPreferences['rent'].value = slugRentalPreferences['rent'] as number
    rentalPreferences['rent'].selection = 'customRent'
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'rent')
        ?.options as RentQuestion['options']
    ).find(option => option.slug === slugRentalPreferences['rent'])?.value
    if (result) {
      rentalPreferences['rent'].value = result
      rentalPreferences['rent'].selection = result
    }
  }

  result = slugRentalPreferences['beds-priority']
  if (result) {
    rentalPreferences.priority.categories.beds.value = result
  }

  result = slugRentalPreferences['baths-priority']
  if (result) {
    rentalPreferences.priority.categories.baths.value = result
  }

  result = slugRentalPreferences['size-priority']
  if (result) {
    rentalPreferences.priority.categories.size.value = result
  }

  result = slugRentalPreferences['rent-priority']
  if (result) {
    rentalPreferences.priority.categories.rent.value = result
  }

  return rentalPreferences
}

export const convertToSlugRentalPreferences = (
  rentalPreferences: RentalPreferences
) => {
  const slugRentalPreferences: SlugRentalPreferences = {}

  if (
    rentalPreferences['bedrooms'].value &&
    !isNaN(Number(rentalPreferences['bedrooms'])) &&
    rentalPreferences['bedrooms'].value >= 1 &&
    rentalPreferences['bedrooms'].value <= 4
  ) {
    slugRentalPreferences['beds'] = rentalPreferences['bedrooms'].value as
      | 1
      | 2
      | 3
      | 4
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'bedrooms')
        ?.options as BedroomQuestion['options']
    ).find(option => option.value === rentalPreferences['bedrooms'].value)?.slug
    if (result) {
      slugRentalPreferences['beds'] = result
    }
  }

  if (
    rentalPreferences['bathrooms'].value &&
    !isNaN(Number(rentalPreferences['bathrooms'])) &&
    rentalPreferences['bathrooms'].value >= 1 &&
    rentalPreferences['bathrooms'].value <= 3
  ) {
    slugRentalPreferences['baths'] = rentalPreferences['bathrooms'].value as
      | 1
      | 1.5
      | 2
      | 2.5
      | 3
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'bathrooms')
        ?.options as BathroomQuestion['options']
    ).find(
      option => option.value === rentalPreferences['bathrooms'].value
    )?.slug
    if (result) {
      slugRentalPreferences['baths'] = result
    }
  }

  slugRentalPreferences['home'] = (
    QUESTIONS.find(question => question.category.value === 'home')
      ?.options as HomeQuestion['options']
  ).find(option => option.value === rentalPreferences['home'].value)?.slug

  if (!isNaN(Number(rentalPreferences['size'].value))) {
    slugRentalPreferences['size'] = rentalPreferences['size'].value as number
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'size')
        ?.options as SizeQuestion['options']
    ).find(option => option.value === rentalPreferences['size'].value)?.slug
    if (result) {
      slugRentalPreferences['size'] = result
    }
  }

  if (!isNaN(Number(rentalPreferences['rent'].value))) {
    slugRentalPreferences['rent'] = rentalPreferences['rent'].value as number
  } else {
    let result = (
      QUESTIONS.find(question => question.category.value === 'rent')
        ?.options as RentQuestion['options']
    ).find(option => option.value === rentalPreferences['rent'].value)?.slug
    if (result) {
      slugRentalPreferences['rent'] = result
    }
  }

  let result = null

  result = rentalPreferences.priority.categories.beds.value
  if (result) {
    slugRentalPreferences['beds-priority'] = result
  }

  result = rentalPreferences.priority.categories.baths.value
  if (result) {
    slugRentalPreferences['baths-priority'] = result
  }

  result = rentalPreferences.priority.categories.size.value
  if (result) {
    slugRentalPreferences['size-priority'] = result
  }

  result = rentalPreferences.priority.categories.rent.value
  if (result) {
    slugRentalPreferences['rent-priority'] = result
  }

  return slugRentalPreferences
}

import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { PriorityOptions } from 'ratedrentals-types'

export const getSlugRentalPreferences = (query: NextParsedUrlQuery) => {
  const slugRentalPreferences: SlugRentalPreferences = {}

  let bedsQueryValue: NextParsedUrlQuery[number] | number = query['beds']
  const bedsValues = (
    QUESTIONS.find(question => question.category.slug === 'beds')
      ?.options as BedroomQuestion['options']
  ).map(option => option.slug.toString())
  if (
    bedsQueryValue &&
    typeof bedsQueryValue === 'string' &&
    !isNaN(Number(bedsQueryValue))
  ) {
    bedsQueryValue = parseInt(bedsQueryValue)
  }
  if (
    (typeof bedsQueryValue === 'string' &&
      bedsValues.includes(bedsQueryValue)) ||
    typeof bedsQueryValue === 'number'
  ) {
    slugRentalPreferences['beds'] =
      bedsQueryValue as BedroomQuestion['options'][number]['slug']
  }

  let bathsQueryValue: NextParsedUrlQuery[number] | number = query['baths']
  const bathsValues = (
    QUESTIONS.find(question => question.category.slug === 'baths')
      ?.options as BathroomQuestion['options']
  ).map(option => option.slug.toString())
  if (
    bathsQueryValue &&
    typeof bathsQueryValue === 'string' &&
    !isNaN(Number(bathsQueryValue))
  ) {
    bathsQueryValue = parseInt(bathsQueryValue)
  }
  if (
    (typeof bathsQueryValue === 'string' &&
      bathsValues.includes(bathsQueryValue)) ||
    typeof bathsQueryValue === 'number'
  ) {
    slugRentalPreferences['baths'] =
      bathsQueryValue as BathroomQuestion['options'][number]['slug']
  }

  let homeQueryValue: NextParsedUrlQuery[number] | number = query['home']
  const homeValues = (
    QUESTIONS.find(question => question.category.slug === 'home')
      ?.options as HomeQuestion['options']
  ).map(option => option.slug.toString())
  if (
    homeQueryValue &&
    typeof homeQueryValue === 'string' &&
    homeValues.includes(homeQueryValue)
  ) {
    slugRentalPreferences['home'] =
      homeQueryValue as HomeQuestion['options'][number]['slug']
  }

  let sizeQueryValue: NextParsedUrlQuery[number] | number = query['size']
  const sizeValues = (
    QUESTIONS.find(question => question.category.slug === 'size')
      ?.options as SizeQuestion['options']
  ).map(option => option.slug?.toString())
  if (
    sizeQueryValue &&
    typeof sizeQueryValue === 'string' &&
    !isNaN(Number(sizeQueryValue))
  ) {
    sizeQueryValue = parseInt(sizeQueryValue)
  }
  if (
    (typeof sizeQueryValue === 'string' &&
      sizeValues.includes(sizeQueryValue)) ||
    typeof sizeQueryValue === 'number'
  ) {
    slugRentalPreferences['size'] =
      sizeQueryValue as SizeQuestion['options'][number]['slug']
  }

  let rentQueryValue: NextParsedUrlQuery[number] | number = query['rent']
  const rentValues = (
    QUESTIONS.find(question => question.category.slug === 'rent')
      ?.options as RentQuestion['options']
  ).map(option => option.slug?.toString())
  if (
    rentQueryValue &&
    typeof rentQueryValue === 'string' &&
    !isNaN(Number(rentQueryValue))
  ) {
    rentQueryValue = parseInt(rentQueryValue)
  }
  if (
    (typeof rentQueryValue === 'string' &&
      rentValues.includes(rentQueryValue)) ||
    typeof rentQueryValue === 'number'
  ) {
    slugRentalPreferences['rent'] =
      rentQueryValue as RentQuestion['options'][number]['slug']
  }

  let bedsPriorityQueryValue: NextParsedUrlQuery[number] | number =
    query['beds-priority']
  try {
    if (typeof bedsPriorityQueryValue === 'string') {
      bedsPriorityQueryValue = parseInt(bedsPriorityQueryValue)
    }
  } catch (error) {}
  if (
    typeof bedsPriorityQueryValue === 'number' &&
    bedsPriorityQueryValue <= 10 &&
    bedsPriorityQueryValue >= 1
  ) {
    slugRentalPreferences['beds-priority'] =
      bedsPriorityQueryValue as PriorityOptions
  }

  let bathsPriorityQueryValue: NextParsedUrlQuery[number] | number =
    query['baths-priority']
  try {
    if (typeof bathsPriorityQueryValue === 'string') {
      bathsPriorityQueryValue = parseInt(bathsPriorityQueryValue)
    }
  } catch (error) {}
  if (
    typeof bathsPriorityQueryValue === 'number' &&
    bathsPriorityQueryValue <= 10 &&
    bathsPriorityQueryValue >= 1
  ) {
    slugRentalPreferences['baths-priority'] =
      bathsPriorityQueryValue as PriorityOptions
  }

  let sizePriorityQueryValue: NextParsedUrlQuery[number] | number =
    query['size-priority']
  try {
    if (typeof sizePriorityQueryValue === 'string') {
      sizePriorityQueryValue = parseInt(sizePriorityQueryValue)
    }
  } catch (error) {}
  if (
    typeof sizePriorityQueryValue === 'number' &&
    sizePriorityQueryValue <= 10 &&
    sizePriorityQueryValue >= 1
  ) {
    slugRentalPreferences['size-priority'] =
      sizePriorityQueryValue as PriorityOptions
  }

  let rentPriorityQueryValue: NextParsedUrlQuery[number] | number =
    query['rent-priority']
  try {
    if (typeof rentPriorityQueryValue === 'string') {
      rentPriorityQueryValue = parseInt(rentPriorityQueryValue)
    }
  } catch (error) {}
  if (
    typeof rentPriorityQueryValue === 'number' &&
    rentPriorityQueryValue <= 10 &&
    rentPriorityQueryValue >= 1
  ) {
    slugRentalPreferences['rent-priority'] =
      rentPriorityQueryValue as PriorityOptions
  }

  return slugRentalPreferences
}
