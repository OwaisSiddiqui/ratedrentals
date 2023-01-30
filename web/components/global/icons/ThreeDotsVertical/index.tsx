const ThreeDotsVertical = ({ size, color }: {
    size: {
        width: number
        height: number
    }
    color?: string
}) => {
    return (
        <svg width={size.width} height={size.height} xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Ellipsis Vertical</title><circle cx="256" cy="256" r="32" fill="none" stroke={color ?? 'black'} strokeMiterlimit="10" strokeWidth="32"/><circle cx="256" cy="416" r="32" fill="none" stroke={color ?? 'black'} strokeMiterlimit="10" strokeWidth="32"/><circle cx="256" cy="96" r="32" fill="none" stroke={color ?? 'black'}strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
}

export default ThreeDotsVertical