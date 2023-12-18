function Alert({message,className}) {
    const classes = className || ''
    
    return (
        <div className={` mx-auto text-center  animate__animated animate__slideInDown alert alert-success w-500 z-3  ${classes}`}  role="alert">
  {message}
</div>
    )
}

export default Alert
