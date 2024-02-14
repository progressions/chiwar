import { useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

interface User {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = cookies.get("jwt_authorization")
    if (token) {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < Date.now()) {
        cookies.remove("jwt_authorization")
      } else {
        setUser(decoded)
      }
    }
  }, [])

  const login = async (email, password) => {
    console.log(email, password)
    const response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://localhost:3000/users/sign_in',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: JSON.stringify({user: { email, password }})
    })

    if (response.status === 200) {
      const authToken = response.headers.get('authorization')
      const decoded = jwtDecode(authToken)
      cookies.set("jwt_authorization", authToken, {
        expires: new Date(decoded.exp * 1000),
      })
      console.log("user", response.data.data)
      setUser(decoded)
    } else {
      console.log("what")
    }
  }

  const logout = () => {
    setUser(null)
    cookies.remove("jwt_authorization")
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
