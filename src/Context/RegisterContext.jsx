import { createContext, useContext, useReducer } from "react";

const registerContext = createContext();

const initialState = {
  username: '',
  password: '',
};
function reducer(snState, action) {
  switch (action.type) {
    case "get": {
      return {
        ...snState,
        username: action.payload.user,
        password: action.payload.pass,
      };
    }
    default: {
      throw new Error("Action not Know");
    }
  }
}

function RegisterProvider({ children }) {
  const [{ username, password }, dispatch] = useReducer(reducer, initialState);

  function getCreditials(user, pass) {
    dispatch({ type: "get", payload: { user, pass } });
  }
  return (
    <registerContext.Provider value={{ getCreditials, username, password }}>
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
