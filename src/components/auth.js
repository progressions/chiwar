import { useState, createContext, useContext } from 'react';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  console.log("auth context user", user)

  const login = (user) => {
    console.log("logging in", user)
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
