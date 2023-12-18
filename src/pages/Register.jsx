import { UseRegister } from "../Context/RegisterContext";
import DirectUser from "../components/DirectUser";
import ErrorForm from "../components/ErrorForm";
import Button from "../components/UI/Button";

function Register() {
  const { userInfo, getUserName, getPassWord, getAllInfo, errors,errorMessage } =
    UseRegister();

  const { user, password } = errors;


  return (
    <div className="login">
      <form action="">
        <div className={`login__card pb-50 boradius-8`}>
          <div className="login__card--header pt-15 pb-15 mb-15">
            <img className="d-block mx-auto" src="./imgs/logo-sm.png" alt="" />
            <p className="text-white text-center">Let&apos;s Get Started App</p>
          </div>
          <div className="pr-25 pl-25">
            <div className={`  ${(user && "error") || ""}`}>
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
              {<ErrorForm message={user && errorMessage.userMsg} />}
            </div>
            <div className={` ${(password && "error") || ""}`}>
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
              {<ErrorForm message={password&&errorMessage.passMsg}/>}
            </div>
          </div>
          <Button
            className={"mx-auto d-block mt-25 pl-50 pr-50 boradius-4"}
            onClick={() => getAllInfo()}
          >
            Sign Up
          </Button>
          <DirectUser
            message={"Already  have an account "}
            action={"Sing In"}
            page="/"
          />
        </div>
      </form>
    </div>
  );
}

export default Register;
