const Close = ({
  color,
  size,
  onClick,
}: {
  color?: string
  size: {
    width: number
    height: number
  }
  onClick?: () => void
}) => {
  return (
    <svg
      onClick={onClick ?? undefined}
      xmlns='http://www.w3.org/2000/svg'
      className='ionicon'
      viewBox='0 0 512 512'
      width={size.width}
      height={size.height}
    >
      <title>Close</title>
      <path
        fill='none'
        stroke={color ?? 'black'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M368 368L144 144M368 144L144 368'
      />
    </svg>
  )
}

export default Close
