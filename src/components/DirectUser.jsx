import { Link } from "react-router-dom"



function DirectUser({message,action,page}) {
     
    return (
        <div className="d-flex justify-content-center align-items-center mt-25">
            <p className="mb-0">{message}</p>
            <Link to={page} className={'singup fw-bold ml-10'} >{action}</Link>
            
        </div>
    )
}

export default DirectUser
