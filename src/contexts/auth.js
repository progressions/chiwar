import { useState, createContext, useContext } from 'react';
import axios from "axios";

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
