import { createContext, useContext, useEffect, useReducer } from "react";
import { FetchData } from "../hooks/Fetch";

const FoodContext = createContext();
const initalState = {
  selectedMeals: [],
  filterdMeals: [],
  added: undefined,
  currencySign: "$",
  shaking: false,
  allMeals :[],
  searchedMealsFilter :[],
  currencyData:[]
 
};

function reducer(snState, action) {

  
  switch (action.type) {
    case "fetchCurrency":{
      return {...snState,currencyData:action.payload}
    }
    case "get":{
      return {...snState,allMeals:action.payload,searchedMealsFilter:action.payload}
    }
    case "getInfo": {
      const mealName = action.payload.name;
      const mealPrice = action.payload.price;

      const uniqueMeals = [
        ...snState.selectedMeals,
        { mealName: mealName, mealPrice: mealPrice, noOfItems: 1 },
      ].reduce((acc, cur) => {
        if (!acc.map((item) => item.mealName).includes(cur.mealName)) {
          snState.shaking = true;
          return [...acc, cur];
        } else {
          snState.shaking = false;
          return [...acc];
        }
      }, []);

      //Checking if added before
      const checkAdd = snState.filterdMeals
        .map((item) => item.mealName)
        .includes(mealName);

      return {
        ...snState,
        selectedMeals: [
          ...snState.selectedMeals,
          { mealName, mealPrice, noOfItems: 1 },
        ],
        filterdMeals: uniqueMeals,
        added: checkAdd,
      };
    }
    case "hideBackdrop": {
      return { ...snState, added: undefined };
    }
    case "cancelAnim": {
      return { ...snState, shaking: false };
    }
    case "inc": {
      const incItems = snState.filterdMeals.map((item, index) => {
        if (index === action.payload) {
          return { ...item, noOfItems: item.noOfItems++ };
        } else {
          return { ...item, noOfItems: item.noOfItems };
        }
      });

      return { ...snState, filterdMeals: incItems, selectedMeals: incItems };
    }
    case "dec": {
      const decItems = snState.filterdMeals.map((item, index) => {
        if (index === action.payload) {
          return {
            ...item,
            noOfItems: item.noOfItems === 1 ? item.noOfItems : item.noOfItems--,
          };
        } else {
          return { ...item, noOfItems: item.noOfItems };
        }
      });
      return { ...snState, filterdMeals: decItems, selectedMeals: decItems };
    }

    case "remove": {
      const removedMeals = snState.filterdMeals.filter((item, index) => {
        if (index !== action.payload) {
          return { ...item };
        }
      });
      return {
        ...snState,
        filterdMeals: removedMeals,
        selectedMeals: removedMeals,
      };
    }

    case "search":{
     const keyword = action.payload.toLowerCase()

     
      const searchedMeals =  snState.allMeals.filter((item)=>{
        return (item.name.toLowerCase().indexOf(keyword)>-1
                ||
                item.description.toLowerCase().indexOf(keyword)>-1
        
        )
      })
      return {...snState,searchedMealsFilter:(searchedMeals)}
      
      
    }
    case "getCurrency":{
      const prices = snState.allMeals.map((item)=>item.price)
      const index = action.payload

      const curData =  Object.keys(snState.currencyData.data).map((key) => {return {cur:key, val:snState.currencyData.data[key]}});
      const currencyValue = curData[index].val
      const currencySign = curData[index].cur
      const currnecy= snState.searchedMealsFilter.map((item,index)=>{
        return {...item,price:(prices[index]*currencyValue).toFixed(2)}
      })
      return {...snState,searchedMealsFilter:currnecy,currencySign:currencySign}
    }

    default: {
      throw new Error("Action not known");
    }
  }
}

function FoodProvider({ children }) {
  const { meals, error, isLoading } = FetchData(`http://localhost:8000/meals`);
  const {currency} = FetchData(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_huwSkG0Y1ktCuzTwvR6PdEfL0nJWd68LdSYIkqzo`)


   
  const [{ added, filterdMeals, currencySign, shaking ,allMeals,searchedMealsFilter}, dispatch] = useReducer(
    reducer,
    initalState
  );

  

  function getInfoCart(name, price, index) {
    dispatch({ type: "getInfo", payload: { name, price, index } });
    setTimeout(() => {
      dispatch({ type: "cancelAnim" });
    }, 1000);
  }
  function hideModal() {
    dispatch({ type: "hideBackdrop" });
  }
  function increaseItems(index) {
    dispatch({ type: "inc", payload: index });
  }
  function decrement(index) {
    dispatch({ type: "dec", payload: index });
  }

  function deleteItem(index) {
    dispatch({ type: "remove", payload: index });
  }
  function searchMeals(keyword) {
    dispatch({ type: "search", payload: keyword });
  }

  function getCurrency(index){
    dispatch({type:"getCurrency",payload:index})
  }
  useEffect(() => {
    dispatch({ type: "inc" });
    dispatch({ type: "dec" });
    dispatch({type:'get',payload:meals})
    dispatch({type:'fetchCurrency',payload:currency})
  }, [meals,currency]);

  return (
    <FoodContext.Provider
      value={{
        shaking,
        currencySign,
        allMeals,
        error,
        isLoading,
        getInfoCart,
        added,
        hideModal,
        filterdMeals,
        increaseItems,
        decrement,
        deleteItem,
        searchMeals,
        searchedMealsFilter,
        currency,
        getCurrency
      }}
    >
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
