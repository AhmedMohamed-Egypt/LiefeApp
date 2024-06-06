import { createContext, useContext, useEffect, useReducer } from "react";
import { FetchData } from "../hooks/Fetch";
import { FetchCurrency } from "../hooks/FetchCurrency";

const FoodContext = createContext();
const initalState = {
  filterdMeals: [],
  currencySign: "$",
  shaking: false,
  allMeals: [],
  searchedMealsFilter: [],
  currencyData: {},
  added: false,
  valueMeal: 1,
};

function reducer(snState, action) {
  switch (action.type) {
    case "fetchCurrency": {
      return { ...snState, currencyData: action.payload };
    }

    case "get": {
      return {
        ...snState,
        allMeals: action.payload,
        searchedMealsFilter: action.payload,
      };
    }
    case "addToCart": {
      const updateSelectedItems = snState.allMeals.reduce(
        (acc, cur) => {
          if (cur.name === action.payload.name) {
            return [...acc, { ...cur, noOfItems: 1 }];
          } else {
            return [...acc];
          }
        },

        []
      );

      const checkAdded = snState.filterdMeals
        .map((item) => item.name)
        .includes(action.payload.name);

      return {
        ...snState,

        filterdMeals: checkAdded
          ? [...snState.filterdMeals]
          : [...snState.filterdMeals, ...updateSelectedItems],
        added: checkAdded,
        shaking: !checkAdded,
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

      return { ...snState, filterdMeals: incItems };
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
      return {
        ...snState,
        filterdMeals: decItems,
      };
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
        
      };
    }

    case "search": {
      const keyword = action.payload.toLowerCase();

      const searchedMeals = snState.allMeals
        .filter((item) => {
          return (
            item.name.toLowerCase().indexOf(keyword) > -1 ||
            item.description.toLowerCase().indexOf(keyword) > -1
          );
        })
        .map((item) => {
          return {
            ...item,
            price: (item.price * snState.valueMeal).toFixed(2),
          };
        });

      return { ...snState, searchedMealsFilter: searchedMeals };
    }
    case "getCurrency": {
      const index = action.payload;

      const curData = Object.keys(snState.currencyData.data).map((key) => {
        return { cur: key, val: snState.currencyData.data[key] };
      });
      const currencyValue = curData[index].val;
      const currencySign = curData[index].cur;

      const updateSearchedMeals = 
      
       snState.allMeals.reduce((acc, cur) => {
        if (
          snState.searchedMealsFilter
            .map((item) => item.name)
            .includes(cur.name)
        ) {
          return [
            ...acc,
            { ...cur, price: (cur.price * currencyValue).toFixed(2) },
          ];
        } else {
          return [...acc];
        }
      }, []);

      
      return {
        ...snState,

        currencySign: currencySign,

        valueMeal: currencyValue,
        searchedMealsFilter: updateSearchedMeals,
      };
    }

    default: {
      throw new Error("Action not known");
    }
  }
}

function FoodProvider({ children }) {
  const { meals, error, isLoading } = FetchData(`https://api.jsonbin.io/v3/b/666045b6e41b4d34e4fecfe4`);
  
  const { currency } = FetchCurrency(
    `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_huwSkG0Y1ktCuzTwvR6PdEfL0nJWd68LdSYIkqzo`
  );

  const [
    {
      filterdMeals,
      currencySign,
      shaking,
      allMeals,
      searchedMealsFilter,
      added,
      valueMeal,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  function getInfoCart(name, price, id) {
    dispatch({ type: "addToCart", payload: { name, price, id } });
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

  function getCurrency(index) {
    dispatch({ type: "getCurrency", payload: index });
  }

  useEffect(() => {
   // dispatch({ type: "inc" });
  //  dispatch({ type: "dec" });
    dispatch({ type: "get", payload: meals });
    dispatch({ type: "fetchCurrency", payload: currency });
  }, [meals, currency]);

  return (
    <FoodContext.Provider
      value={{
        shaking,
        currencySign,
        allMeals,
        error,
        isLoading,
        getInfoCart,

        hideModal,
        filterdMeals,
        increaseItems,
        decrement,
        deleteItem,
        searchMeals,
        searchedMealsFilter,
        currency,
        getCurrency,
        added,
        valueMeal,
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
