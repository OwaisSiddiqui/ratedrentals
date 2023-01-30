const Move = ({
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
      className='ionicon'
      viewBox='0 0 512 512'
    >
      <title>Move</title>
      <path
        fill='none'
        stroke='rgba(255, 255, 255, 0.8)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
        d='M176 112l80-80 80 80M255.98 32l.02 448M176 400l80 80 80-80M400 176l80 80-80 80M112 176l-80 80 80 80M32 256h448'
      />
    </svg>
  )
}

export default Move
