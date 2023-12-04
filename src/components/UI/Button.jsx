function Button({children,onClick,className}) {
    const classes =  className || ''
    return (
        <button className={`btn btn-primary ${classes}`} onClick={onClick} type="button">{children} </button>
    )
}

export default Button
