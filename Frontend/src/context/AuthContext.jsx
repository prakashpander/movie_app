import React, { useState } from 'react'
import { createContext ,useContext } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [admin , setAdmin] = useState(null);

    let value = {
      user, setUser , admin , setAdmin
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider;