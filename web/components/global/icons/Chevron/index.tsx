const Chevron = ({
  color,
  size,
  position,
}: {
  position: 'up' | 'right' | 'down' | 'left'
  size: {
    width: number
    height: number
  }
  color: string
}) => {
  return (
    <svg
      style={(() => {
        let rotate = null
        switch (position) {
          case 'up':
            rotate = '-90deg'
            break
          case 'down':
            rotate = '90deg'
            break
          case 'left':
            rotate = '180deg'
            break
          default:
            rotate = '0deg'
            break
        }
        return {
          transform: `rotate(${rotate})`,
        }
      })()}
      xmlns='http://www.w3.org/2000/svg'
      className='ionicon'
      viewBox='0 0 512 512'
      width={size.width}
      height={size.height}
      preserveAspectRatio='xMidYMid'
    >
      <path
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='48'
        d='M184 112l144 144-144 144'
      />
    </svg>
  )
}

export default Chevron
