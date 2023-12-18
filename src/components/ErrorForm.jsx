function ErrorForm({message}) {
    //
    return (
        <p className={`${message&&'animate__animated  animate__fadeInLeft'} text-danger mb-0`} style={{height:'24px'}}>
       {message}
        </p>
            
       
    )
}

export default ErrorForm
