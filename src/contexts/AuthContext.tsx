import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import type { User } from '@/types/types'
import axios from 'axios'
import Client from '@/utils/Client'

interface AuthContextType {
  jwt: string | null
  user: User | null
  logout: () => void
  login: (email: string, password: string) => Promise<void>
  client: Client
}

interface AuthProviderProps {
  children: ReactNode
}

interface DecodedToken {
  exp: number
  // Add other properties from your JWT payload as needed
}

// Creating the context with an initial undefined value, but it will never actually be undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const client = new Client({ jwt })

  const logout = () => {
    Cookies.remove('jwt_authorization')
    setJwt(null)
    setUser(null)
  }

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/users/sign_in',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "true",
      },
      data: JSON.stringify({user: { email, password }})
    }).catch((error) => {
      console.log(error)
      return error
    })

    if (response.status === 200) {
      const authToken = response.headers.get('authorization')
      if (authToken) {
        Cookies.set('jwt_authorization', authToken)
        loginFromToken(authToken)
      }
    }

    return response
  }

  const loginFromToken = (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token)
      const isExpired = decodedToken.exp * 1000 < Date.now()
      if (!isExpired) {
        console.log(decodedToken)
        setJwt(token)
        // Optionally set the user
        setUser(decodedToken.user)
      } else {
        console.log("JWT is expired")
        // Optionally clear the expired token
        Cookies.remove('jwt_authorization')
      }
    } catch (error) {
      console.error("Invalid JWT", error)
      // Optionally clear the invalid token
      Cookies.remove('jwt_authorization')
    }
  }

  useEffect(() => {
    const jwtFromCookie = Cookies.get('jwt_authorization')
    if (jwtFromCookie) {
      loginFromToken(jwtFromCookie)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ jwt, user, login, logout, client }}>
      {children}
    </AuthContext.Provider>
  )
}
