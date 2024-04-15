import { createContext, useState } from "react";

export let authContext = createContext()
export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)
    return (
      <authContext.Provider value={{ token, setToken }}>
        {children}
      </authContext.Provider>
    );
    
}

