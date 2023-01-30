const LinkIcon = ({
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
      <title>Link</title>
      <path
        d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='36'
      />
    </svg>
  )
}

export default LinkIcon
