const Share = ({
  size,
}: {
  size: {
    width: number
    height: number
  }
}) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <title>Share</title>
      <path
        d='M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40M336 128l-80-80-80 80M256 321V48'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  )
}

export default Share
