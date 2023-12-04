import { useReducer } from "react";
import { UseRegister } from "../Context/RegisterContext";
import DirectUser from "../components/DirectUser";
import Button from "../components/UI/Button";
import { NavLink } from "react-router-dom";


const initalState = {
  user: "",
  pass: "",
  error: undefined,
};
function reducer(snState, action) {
  switch (action.type) {
    case "getUser": {
      if (!snState.user.length) {
        return { ...snState, error: undefined, user: action.payload };
      }

      return { ...snState, user: action.payload };
    }
    case "getPass": {
      if (!snState.pass.length)
        return { ...snState, error: undefined, pass: action.payload };
      return { ...snState, pass: action.payload };
    }

    case "checking": {
      if (snState.user === "" || snState.pass === "") {
        return { ...snState, error: "error" };
      }
      return { ...snState, user: "", pass: "" };
    }

    default: {
      throw new Error("Action not Known");
    }
  }
}

function Register() {
  const { getCurrentUser, posted } = UseRegister();

  const [{ user, pass, error }, dispatch] = useReducer(reducer, initalState);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "checking" });
    if (!user.length || !pass.length) {
      return;
    }
    await getCurrentUser(user, pass);
  }

  const showOkAuth = posted && <>
  <div className="alert alert-success success-sign " role="alert">
  Successful Sign Up
  <NavLink to="/" replace={-1}>Sign in</NavLink>
</div>
  </>


  return (
    <div className="login">
      {showOkAuth}
      <form action="">
        <div className={`login__card pb-50 boradius-8`}>
          <div className="login__card--header pt-15 pb-15 mb-15">
            <img className="d-block mx-auto" src="./imgs/logo-sm.png" alt="" />
            <p className="text-white text-center">Let&apos;s Get Started App</p>
          </div>
          <div className="pr-25 pl-25">
            <div
              className={`input-group mb-15 flex-column ${
                user === "" ? error && "error" : ""
              }`}
            >
              <label htmlFor="" className="d-block mb-10">
                User name
              </label>
              <input
                type="text"
                className={`form-control w-100 `}
                placeholder="Username"
                aria-label="Password"
                aria-describedby="basic-addon1"
                value={user}
                onChange={(e) =>
                  dispatch({ type: "getUser", payload: e.target.value })
                }
              />
            </div>
            <div
              className={`input-group mb-15 flex-column ${
                pass === "" ? error && "error" : ""
              }`}
            >
              <label htmlFor="" className="d-block mb-10">
                Password
              </label>
              <input
                type="password"
                className="form-control w-100"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                value={pass}
                onChange={(e) => {
                  dispatch({ type: "getPass", payload: e.target.value });
                }}
              />
            </div>
          </div>
          <Button
            disabled={error && true}
            className={"mx-auto d-block mt-25 pl-50 pr-50 boradius-4"}
            onClick={(e) => handleSubmit(e)}
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
