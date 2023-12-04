import DirectUser from "../components/DirectUser";
import Button from "../components/UI/Button";
import img from '../assets/logo-sm.png'
import { UseRegister } from "../Context/RegisterContext";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  userLogin:'',
  passLogin:''

}
function reducer(snState,action){
  switch(action.type){
    case ('getUser'):{
      return {...snState,userLogin:action.payload}
    }
    case ('getPassword'):{
      return {...snState,passLogin:action.payload}
    }
    default :{
      throw new Error('Action not Known')
    }
  }
}

function Login() {
 const {getUsersLogin,validLogin} = UseRegister()
 const [{userLogin,passLogin},dispatch] = useReducer(reducer,initialState)
  const navigate = useNavigate()
 function handleLogin(e){
  e.preventDefault()
  getUsersLogin(userLogin,passLogin)
 
 }
 useEffect(()=>{
  if(validLogin){
    navigate('/Home')
   }
 },[navigate,validLogin])




  return (
    <div className="login">
    <form action="">
    <div className={`login__card pb-50 boradius-8`}>
        <div className="login__card--header pt-15 pb-15 mb-15">
          <img className="d-block mx-auto" src={img}  alt="logo" />
          <p className="text-white text-center">Let&apos;s Get Started App</p>
        </div>
        <div className="pr-25 pl-25">
          <div className="input-group mb-15 flex-column">
            <label htmlFor="" className="d-block mb-10">
              user name
            </label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e)=>dispatch({type:'getUser',payload:e.target.value})}
              value={userLogin}
             
            />
          </div>
          <div className="input-group mb-15 flex-column">
            <label htmlFor="" className="d-block mb-10">
              password
            </label>
            <input
              type="password"
              className="form-control w-100"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e)=>dispatch({type:'getPassword',payload:e.target.value})}

              value={passLogin}
             
            />
          </div>
          <Button className={'mx-auto d-block mt-25 pl-50 pr-50 boradius-4'} onClick={(e)=>handleLogin(e)}>Log In</Button>
        </div>
       <DirectUser message={"Dont't have an account "} action={"Sign Up"} page="signup"/>
      </div>
      
    </form>
    
    </div>
  );
}

export default Login;
