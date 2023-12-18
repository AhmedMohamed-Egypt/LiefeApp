import { createContext, useContext, useReducer } from "react";

const registerContext = createContext();

const initialState = {
  userInfo: {
    username: "",
    password: "",
    id:"",
  },
  errors: {
    user: false,
    password: false,
  },
  posted: false,
  
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
        errors: { ...snState.errors, user: false},
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
       passwordError = false
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
        errors: {  user: userError, password: passwordError },
        
      };
    }

    case 'post':{
      return {...snState,userInfo:{...snState.userInfo,username:'',password:'',posted:true}}
    }

    default: {
      throw new Error("Action not Know");
    }
  }
}

function RegisterProvider({ children }) {
  const [{ userInfo, errors }, dispatch] = useReducer(reducer, initialState);

  function getUserName(username) {
    dispatch({ type: "change", payload: username });
  }
  function getPassWord(password) {
    dispatch({ type: "changePass", payload: password });
  }

 async function getAllInfo() {
    dispatch({ type: "getAllInfo",payload:true });
    
    
      async function postUsers(userCredntials) {
      const res = await fetch(`http://localhost:8000/users`, {
        method: "POST",
        body: JSON.stringify(userCredntials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json()
      if(res.ok){
        dispatch({type:'post',payload:data})
      }
      
    }

    if(userInfo.username  && userInfo.password){
      await postUsers(userInfo)
    }
  
  
    
    
  }


  return (
    <registerContext.Provider
      value={{
        userInfo,
        getUserName,
        getPassWord,
        getAllInfo,
        errors,
        errorMessage,
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
