const BOOKMARKED_BACKGROUND_COLOR = 'hsl(54, 99%, 54%)'
const BOOKMARKED_BORDER_COLOR = 'hsl(54, 99%, 46%)'

const Bookmark = ({
  size,
  isBookmarked,
}: {
  size: {
    width: number
    height: number
  }
  isBookmarked: boolean
}) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      xmlns='http://www.w3.org/2000/svg'
      className='ionicon'
      viewBox='0 0 512 512'
    >
      <title>Bookmark</title>
      <path
        d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z'
        fill={isBookmarked ? BOOKMARKED_BACKGROUND_COLOR : 'none'}
        stroke={isBookmarked ? BOOKMARKED_BACKGROUND_COLOR : 'currentColor'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  )
}

export default Bookmark
