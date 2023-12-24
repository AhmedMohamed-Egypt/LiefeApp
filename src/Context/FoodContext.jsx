import { createContext, useContext, useReducer } from "react";
import { FetchData } from "../hooks/Fetch";

const FoodContext = createContext();
const initalState = {
  selectedMeals: [],
  filterdMeals:[],
  added:undefined,
  currencySign:'$',
  shaking:false,
 
 
};

function reducer(snState, action) {
  switch (action.type) {
    case "getInfo": {
      const mealName = action.payload.name
      const mealPrice = action.payload.price
      const meals = [...snState.selectedMeals,{mealName,mealPrice,noOfItems : 1 }]
      
       const uniqueMeals = meals.reduce((acc,cur)=>{

        if(!acc.map((item)=>item.mealName).includes(cur.mealName)){
         snState.shaking=true
          return [...acc,cur]
        }else {
         snState.shaking = false
          return [...acc]
        }
      },[])

      //Checking if added before
      const checkAdd = snState.filterdMeals.map((item)=>item.mealName).includes(mealName) 

     
      
     
      
      return { ...snState,selectedMeals:[...snState.selectedMeals,{mealName,mealPrice,noOfItems : 1 }] ,filterdMeals:uniqueMeals,added:checkAdd};
    }
    case 'hideBackdrop':{
      return {...snState,added:undefined}
    }
    case 'cancelAnim':{
      return{...snState,shaking:false}
    }

    default: {
      throw new Error("Action not known");
    }
  }
}

function FoodProvider({ children }) {
  const { meals, error, isLoading } = FetchData(`http://localhost:8000/meals`);
  const [{added,filterdMeals,currencySign,shaking}, dispatch] = useReducer(reducer, initalState);


  function getInfoCart(name,price){
    dispatch({type:'getInfo',payload:{name,price}})
    setTimeout(() => {
      dispatch({type:'cancelAnim'})
    }, 1000);
  }
  function hideModal(){
    dispatch({type:'hideBackdrop'})
  }
  
  return (
    <FoodContext.Provider value={{shaking,currencySign, meals, error, isLoading ,getInfoCart,added,hideModal,filterdMeals}}>
      {children}
    </FoodContext.Provider>
  );
}

function UseFood() {
  const context = useContext(FoodContext);

  if (context === undefined) {
    throw new Error("Used Out side of Scope");
  }
  return context;
}

export { FoodProvider, UseFood };
