

import { NavLink, Outlet } from "react-router-dom";
import Welcome from "../components/Welcome";
import { UseRegister } from "../Context/RegisterContext";


function Home() {
    const {login} = UseRegister()
    
   
    return (
        <div className="app">
            {login&&<Welcome/>}
            <div className="app__dashboard d-flex">
                <div className="app-sidebar">
                  <ul className="mt-50">
                    <li className="text-white size-18"><NavLink className='pl-20 pt-7 pb-7 mx-auto boradius-25' to="Food">Food</NavLink></li>
                  </ul>
                </div>
                <div className="app-pages">

                   
                  
                    <Outlet/>
                 
                </div>
            </div>
        </div>
    )
}

export default Home
