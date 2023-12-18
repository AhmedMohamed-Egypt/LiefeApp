
import Button from "../components/UI/Button";
import img from '../assets/logo-sm.png'
import { UseRegister } from "../Context/RegisterContext";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";






function Login() {

const {  getuserLogin,getPassLogin,loginInfo,verifyUser,login} = UseRegister()
const noUser = (loginInfo.username.length !==0) && (loginInfo.password.length!==0) && (login===false)
console.log(noUser)

  return (
    <div className="login">
    <form action="">
    <div className={`login__card pb-50 boradius-8`}>
        <div className="login__card--header pt-20 pb-80 mb-15">
          <img className=" mx-auto" src={img}  alt="logo" />
          <p className="text-white text-center">Let&apos;s Get Started App</p>
        </div>
        <div className="pr-25 pl-25">
          <div className="input-group  flex-column pb-10">
            <label htmlFor="" className="d-block mb-10">
              user name
            </label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={loginInfo.username}
              onChange={(e)=>getuserLogin(e.target.value)}
         
              
             
            />
          </div>
          <div className="input-group  flex-column pb-10">
            <label htmlFor="" className="d-block mb-10">
              password
            </label>
            <input
              type="password"
              className="form-control w-100"
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value = {loginInfo.password}
              onChange={(e)=>{getPassLogin(e.target.value)}}
            
           
             
            />
          </div>
          <Button disabled={login} className={'mx-auto d-block mt-25 pl-50 pr-50 boradius-4'} onClick={()=>verifyUser()} >Log In</Button>
        </div>
      
       <div className="d-flex justify-content-center align-items-center mt-25">
            <p className="mb-0">Dont have an account</p>
            <Link to="/signup" className={'singup fw-bold ml-10'} >Sign Up</Link>
            
        </div>
      </div>
      
    </form>
    {login&&<Alert message={"Successfully Login"}/>}
    {noUser && <Alert message={"Not Found"} className={'alert-danger'}/>}
    </div>
  );
}

export default Login;
