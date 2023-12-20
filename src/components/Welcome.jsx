import { UseRegister } from "../Context/RegisterContext"

function Welcome() {
    const {loginInfo} = UseRegister()

    return (
        <div className="position-absolute alert alert-info animate__slideInRight animate__animated welcome ml-auto" role="alert">
       Welcome Back {loginInfo.username}
      </div>
    )
}

export default Welcome
