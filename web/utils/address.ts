export const toDefaultAddress = (address: string) => {
  return address.replace(/-/g, ' ')
}

export const toSlugAddress = (address: string) => {
  return address.replace(/ /g, '-')
}
