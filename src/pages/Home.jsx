
import { UseRegister } from "../Context/RegisterContext";


function Home() {

    const {loginInfo} = UseRegister()
   
    return (
        <div>
            Hello {loginInfo.username} 
        </div>
    )
}

export default Home
