import { UseRegister } from "../Context/RegisterContext"

function Home() {
    const {currentUser,userCredentials} = UseRegister()
    const UserName = currentUser.name ? currentUser.name :  userCredentials
    return (
        <div>
            Hello Dear {UserName}
        </div>
    )
}

export default Home
