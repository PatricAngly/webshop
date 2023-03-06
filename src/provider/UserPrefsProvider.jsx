import { useState } from "react";
import PrefsContext from "../context/PrefsContext";

const UserPrefsProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  return (
    <PrefsContext.Provider
      value={{
        result: result,
        setResult: setResult,
      }}
    >
      {children}
    </PrefsContext.Provider>
  );
};

export default UserPrefsProvider;
