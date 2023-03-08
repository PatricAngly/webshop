import { useState, useReducer } from "react";
import PrefsContext from "../context/PrefsContext";
import data from "../data/products.json";
const UserPrefsProvider = ({ children }) => {
  const products = data.elektronikprodukter;

  const [result, setResult] = useState(products);

  const [cart, dispatch] = useReducer(reducer, {
    products: [],
    total: 0,
  });
  console.log(cart);

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          products: [...state.products, action.payload], // lägger till en produkt i varukorgen
          total: state.total + action.payload.pris,
        };
      case "UPDATE_CART":
        return {
          ...state,
          products: action.payload.products, // ersätter hela varukorgen med den uppdaterade varukorgen som skickades med i payload
          total: action.payload.products.reduce(
            (acc, item) => acc + item.pris * item.quantity,
            0
          ), // räknar om totalsumman med den uppdaterade varukorgen
        };

      case "REMOVE_FROM_CART":
        return {
          ...state,
          products: action.payload.products,
          total: action.payload.products.reduce(
            (acc, item) => acc + item.pris * item.quantity,
            0
          ),
        };

      default:
        return state;
    }
  }

  return (
    <PrefsContext.Provider
      value={{
        result: result,
        setResult: setResult,
        cart: cart.products,
        dispatch: dispatch,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
};

export default UserPrefsProvider;
