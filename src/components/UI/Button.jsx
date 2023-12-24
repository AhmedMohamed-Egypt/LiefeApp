function Button({children,onClick,className,disabled,type}) {
    const classes =  className || ''
    return (
        <button disabled={disabled} className={`btn btn-primary ${classes}`} onClick={onClick} type={type||'button'}>{children} </button>
    )
}

export default Button
