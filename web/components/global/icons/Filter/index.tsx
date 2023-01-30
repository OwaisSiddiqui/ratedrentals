const Filter = ({
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
      viewBox='0 0 21 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1='19.5'
        y1='3.5'
        x2='1.5'
        y2='3.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='13.5'
        cy='3.5'
        r='2'
        transform='rotate(-180 13.5 3.5)'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
      />
      <line
        x1='1.5'
        y1='12.5'
        x2='19.5'
        y2='12.5'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle
        cx='7.5'
        cy='12.5'
        r='2'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  )
}

export default Filter
