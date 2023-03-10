const Dot = ({ color }: { color?: string }) => {
  return (
    <svg
      width='3'
      height='3'
      viewBox='0 0 3 3'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='1' cy='1.5' r='1' fill={color ?? 'black'} />
    </svg>
  )
}

export default Dot
