import { createContext, useContext, useEffect, useReducer } from "react";

const registerContext = createContext();

const initialState = {
  userInfo: {
    username: "",
    password: "",
    id: "",
  },
  loginInfo: {
    username: "",
    password: "",
  },
  errors: {
    user: false,
    password: false,
  },
  posted: false,
  login: undefined,
  users: [],
  errorServer:''
};
const errorMessage = {
  userMsg: "User Can not be Empty or Number",
  passMsg: "Password can not be empty",
};

function reducer(snState, action) {
  switch (action.type) {
    case "change": {
      const username = action.payload;

      return {
        ...snState,
        userInfo: { ...snState.userInfo, username: username },
        errors: { ...snState.errors, user: false },
      };
    }
    case "changePass": {
      const password = action.payload;
      return {
        ...snState,
        userInfo: { ...snState.userInfo, password: password },
        errors: { ...snState.errors, password: false },
      };
    }

    case "getAllInfo": {
      let userError = false,
        passwordError = false;
      if (
        !snState.userInfo.username.length ||
        !isNaN(snState.userInfo.username)
      ) {
        userError = true;
      }
      if (!snState.userInfo.password.length) {
        passwordError = true;
      }

      return {
        ...snState,
        userInfo: { ...snState.userInfo },
        errors: { user: userError, password: passwordError },
      };
    }

    case "post": {
      return {
        ...snState,
        userInfo: { ...snState.userInfo, username: "", password: "" },
        posted: true,
      };
    }
    case "getUserLogin": {
      return {
        ...snState,
        loginInfo: { ...snState.loginInfo, username: action.payload },
      };
    }
    case "getPassLogin": {
      return {
        ...snState,
        loginInfo: { ...snState.loginInfo, password: action.payload },
      };
    }
    case "getUser": {
      return { ...snState, users: [...action.payload] };
    }
    case "verify": {
      if(!snState.loginInfo.username.length || !snState.loginInfo.password.length) {
        return {...snState}
      } 
      const filterUsers = snState.users.filter((item) => {
        if (
          item.username === snState.loginInfo.username &&
          item.password === snState.loginInfo.password
        ) {
          return true;
        } else {
          return false;
        }
      });


      return { ...snState, login: ((filterUsers[0]?.username&& filterUsers[0]?.password && true) || false)};
    }
    case 'error':{
      return {...snState,errorServer:action.payload}
    }

    default: {
      throw new Error("Action not Know");
    }
  }
}

function RegisterProvider({ children }) {
  const [{ userInfo, errors, posted, loginInfo,login,errorServer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function getUserName(username) {
    dispatch({ type: "change", payload: username });
  }
  function getPassWord(password) {
    dispatch({ type: "changePass", payload: password });
  }

  async function getAllInfo() {
    dispatch({ type: "getAllInfo", payload: true });

    async function postUsers(userCredntials) {
      try{
        const res = await fetch(`http://localhost:8000/userseee`, {
          method: "POST",
          body: JSON.stringify(userCredntials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res.json();
        if (res.ok) {
          console.log(res.ok);
          dispatch({ type: "post", payload: data });
        }else {
          dispatch({type:'error',payload:'there is an error for connection'})
        }

      
      }catch(error){
        dispatch({type:'error',payload:error.message})
        
      }
   
    }

    if (userInfo.username && userInfo.password) {
      await postUsers(userInfo);
    }
  }

  function getuserLogin(user) {
    dispatch({ type: "getUserLogin", payload: user });
  }
  function getPassLogin(pass) {
    dispatch({ type: "getPassLogin", payload: pass });
  }

  function verifyUser() {
    dispatch({ type: "verify" });
  }

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:8000/users");
      const data = await res.json();

      dispatch({ type: "getUser", payload: data });
    }

    getUsers();
  }, [userInfo]);

  return (
    <registerContext.Provider
      value={{
        userInfo,
        getUserName,
        getPassWord,
        getAllInfo,
        errors,
        errorMessage,
        posted,
        getuserLogin,
        loginInfo,
        getPassLogin,
        verifyUser,
        login,
        errorServer
      }}
    >
      {children}
    </registerContext.Provider>
  );
}

function UseRegister() {
  const context = useContext(registerContext);
  if (context === undefined) {
    throw new Error("Context Used Outseide ");
  }

  return context;
}

export { RegisterProvider, UseRegister };
