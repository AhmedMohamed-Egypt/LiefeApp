import { NavLink } from "react-router-dom"



function DirectUser({message,action,page}) {
     
    return (
        <div className="d-flex justify-content-center align-items-center mt-25">
            <p className="mb-0">{message}</p>
            <NavLink className={'singup fw-bold ml-10'} to={page}>{action}</NavLink>
            
        </div>
    )
}

export default DirectUser
