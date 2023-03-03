import { useState } from "react";
import PrefsContext from "../context/PrefsContext";

const UserPrefsProvider = ({ children }) => {
  const [searchProduct, setSearchProduct] = useState();
  return (
    <PrefsContext.Provider
      value={{
        searchedProducts: searchProduct,
        setSearchProduct: setSearchProduct,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
};

export default UserPrefsProvider;
