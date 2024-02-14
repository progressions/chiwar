import { useState, createContext, useContext } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    console.log(email, password)
    const result = await axios({
      method: 'post',
      mode: 'cors',
      url: 'http://localhost:3000/users/sign_in',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: JSON.stringify({user: { email, password }})
    }).then((response) => {
      if (response.status === 200) {
        const authToken = response.headers.get('authorization')
        const decoded = jwtDecode(authToken)

        console.log(response.status)
        console.log(response.data)
        console.log(authToken)
        console.log(decoded)
      } else {
        console.log("what")
      }
    }
    ).catch((error) => {
      console.log(error)
    })
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
