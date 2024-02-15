import { useMemo, useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {}, jwt: null, validateToken: () => {} })

export const AuthProvider = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), [])
  const [user, setUser] = useState(null)
  const [jwt, setJwt] = useState(null)

  const validateToken = useMemo(() => () => {
    const token = cookies.get("jwt_authorization")
    if (token) {
      const decoded = jwtDecode(token)
      if (decoded.exp * 1000 < Date.now()) {
        cookies.remove("jwt_authorization")
        return false
      } else {
        setUser(decoded)
        setJwt(token)
        return true
      }
    }
  }, [cookies])

  useEffect(() => {
    validateToken()
  }, [validateToken])

  const login = async (email, password) => {
    const response = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://localhost:3000/users/sign_in',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: JSON.stringify({user: { email, password }})
    }).catch((error) => {
      return error
    })

    if (response.status === 200) {
      const authToken = response.headers.get('authorization')
      const decoded = jwtDecode(authToken)
      cookies.set("jwt_authorization", authToken, {
        expires: new Date(decoded.exp * 1000),
      })
      setUser(decoded)
    }

    return response
  }

  const logout = () => {
    setUser(null)
    cookies.remove("jwt_authorization")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, jwt, validateToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
