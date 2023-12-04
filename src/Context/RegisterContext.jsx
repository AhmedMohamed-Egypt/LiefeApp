import { createContext, useContext, useEffect, useReducer } from "react";

const RegisterContext = createContext();
const initilState = {
  posted: false,
  errorPost: "",
  currentUser: {},
  userLogin: {},
  validLogin: false,
  userCredentials: "",
};

function reducer(snState, action) {
  switch (action.type) {
    case "success": {
      return { ...snState, posted: true };
    }

    case "failed": {
      return { ...snState, posted: false };
    }

    case "get": {
      return { ...snState, currentUser: { name: action.payload.name } };
    }

    case "getLogin": {
      return { ...snState, userLogin: action.payload };
    }
    case "checkLogin": {
      return { ...snState, validLogin: action.payload };
    }
    case "record":{
        return {...snState,userCredentials:action.payload.name,validLogin:action.payload.valid}
    }

    default: {
      throw new Error("Action not Known");
    }
  }
}

function ProviderRegister({ children }) {
  //My Kitchen

  const [{ posted, userLogin, validLogin ,currentUser,userCredentials }, dispatch] = useReducer(
    reducer,
    initilState
  );

  //fetch Data

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();

        if (res.ok) {
          const names = data.map((item) => item.name);
          const passwords = data.map((item) => item.password);
          if (
            names.includes(userLogin.name) &&
            passwords.includes(userLogin.password)
          ) {
            dispatch({ type: "checkLogin", payload: true });
            await fetch(`http://localhost:8000/current`, {
              method: "POST",
              body: JSON.stringify({name:userLogin.name,valid:true,id:1}),
              headers: {
                "Content-Type": "application/json",
              },
            });
          } else {
            dispatch({ type: "checkLogin", payload: false });
          }
        }
      } catch (error) {
        dispatch({ type: "failedUsers" });
      }
    }
    getData();
  }, [userLogin]);

  //Get Current User

  useEffect(() => {
    async function getCurrentUser() {
      const res = await fetch(`http://localhost:8000/current`);
      const data = await res.json();
      
      dispatch({type:'record',payload:data})
    }
    getCurrentUser();
  }, [userLogin]);

  //Send Data for Json File

  async function postUsers(usrInfo) {
    try {
      const res = await fetch(`http://localhost:8000/users`, {
        method: "POST",
        body: JSON.stringify(usrInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "failed" });
    }
  }
  async function getCurrentUser(name, password) {
    const info = { name, password, id: "" };
    await postUsers(info);
    dispatch({ type: "get", payload: { name, password } });
  }
  async function getUsersLogin(name, password) {
    dispatch({ type: "getLogin", payload: { name, password } });
  }

  return (
    <RegisterContext.Provider
      value={{ postUsers, posted, getCurrentUser, getUsersLogin, validLogin,currentUser,userCredentials}}
    >
      {children}
    </RegisterContext.Provider>
  );
}

function UseRegister() {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error("Context Used outside Context");
  }
  return context;
}

export { ProviderRegister, UseRegister };
