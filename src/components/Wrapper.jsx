function Wrapper({className,children}) {
    const classes = className || ''
    return (
        <div className={classes}>
{children}
        </div>
    )
}

export default Wrapper
