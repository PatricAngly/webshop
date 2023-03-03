import React from "react";
import data from "../data/products.json";

export const products = data.elektronikprodukter;
const PrefsContext = React.createContext({
  searchedProducts: [],
});
console.log(PrefsContext);

export default PrefsContext;
