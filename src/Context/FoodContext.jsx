import { createContext, useContext } from "react";
import { FetchData } from "../hooks/Fetch";

const FoodContext = createContext();

function FoodProvider({ children }) {
  const { meals, error,isLoading} = FetchData(`http://localhost:8000/meals`);

  return <FoodContext.Provider value={{meals,error,isLoading}}>{children}</FoodContext.Provider>;
}

function UseFood() {
  const context = useContext(FoodContext);

  if (context === undefined) {
    throw new Error("Used Out side of Scope");
  }
  return context;
}

export { FoodProvider, UseFood };
