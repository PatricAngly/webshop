import { useState, useReducer } from "react";
import PrefsContext from "../context/PrefsContext";
import data from "../data/products.json";

const UserPrefsProvider = ({ children }) => {
  const products = data.elektronikprodukter;
  const [result, setResult] = useState(products); // sate for search result
  const [cart, dispatch] = useReducer(reducer, {
    // reducer for cart
    products: [],
    total: 0,
  });

  function reducer(state, action) {
    // reducer function to handle sate based on actions
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          products: [...state.products, action.payload], // add new product to products array
          total: state.total + action.payload.pris, // add price of new product to total
        };
      case "UPDATE_CART":
        return {
          products: action.payload.products, // replace products and total with object from payload
          total: action.payload.total,
        };
      default:
        return state;
    }
  }

  return (
    <PrefsContext.Provider
      value={{
        // provides app with global data
        products: products,
        result: result,
        setResult: setResult,
        cart: cart,
        dispatch: dispatch,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
};

export default UserPrefsProvider;
