import { Link } from "react-router-dom";
import { UseRegister } from "../Context/RegisterContext";
import Alert from "../components/Alert";

import ErrorForm from "../components/ErrorForm";
import Button from "../components/UI/Button";

function Register() {
  const { userInfo, getUserName, getPassWord, getAllInfo, errors,errorMessage ,posted} =
    UseRegister();

  const { user, password } = errors;


  return (
    <div className="login">
      <form action="">
        <div className={`login__card pb-50 boradius-8`}>
          <div className="login__card--header pt-20 pb-80 mb-25">
            <img className=" mx-auto" src="./imgs/logo-sm.png" alt="" />
            <p className="text-white text-center">Let&apos;s Get Started App</p>
          </div>
          <div className="pr-25 pl-25">
            <div className={`  ${(user && "error") || ""} pb-10`}>
              <label htmlFor="" className="d-block mb-10">
                User name
              </label>
              <input
                type="text"
                className={`form-control w-100 `}
                placeholder="Username"
                aria-label="username"
                aria-describedby="basic-addon1"
                value={userInfo.username}
                onChange={(e) => getUserName(e.target.value)}
              />
             
              {user&&<ErrorForm message={errorMessage.userMsg}/>}
            </div>
            <div className={` ${(password && "error") || ""} pb-10`}>
              <label htmlFor="" className="d-block mb-10">
                Password
              </label>
              <input
                type="password"
                className={`form-control w-100 `}
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                value={userInfo.password}
                onChange={(e) => getPassWord(e.target.value)}
              />
             
              {password&&<ErrorForm message={errorMessage.passMsg}/>}
            </div>
          </div>
          <Button
            className={"mx-auto d-block mt-25 pl-50 pr-50 boradius-4"}
            onClick={() => getAllInfo()}
            disabled={posted}
          >
            Sign Up
          </Button>
          
            <div className="d-flex justify-content-center align-items-center mt-25">
            <p className="mb-0">Already  have an account</p>
            <Link to="/" className={'singup fw-bold ml-10'} >Sign In</Link>
            
        </div>

        </div>
        {posted&&<Alert message='Sign Up Successfully'/>}
        
      </form>
    </div>
  );
}

export default Register;
