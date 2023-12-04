function Button({children,onClick,className,disabled}) {
    const classes =  className || ''
    return (
        <button disabled={disabled} className={`btn btn-primary ${classes}`} onClick={onClick} type="button">{children} </button>
    )
}

export default Button
