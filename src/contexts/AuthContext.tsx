import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import type { User } from '@/types/types'
import { AxiosResponse } from 'axios'
import Client from '@/utils/Client'

type AuthContextType = {
  user: User | null
  logout: () => void
  login: (email: string, password: string) => Promise<AxiosResponse>
  client: Client
  authLoading: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

type DecodedToken = {
  exp: number
  user: User
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
  const [authLoading, setAuthLoading] = useState(true)
  const client = new Client({ jwt: jwt as string })

  const logout = () => {
    Cookies.remove('jwt_authorization')
    setJwt(null)
    setUser(null)
  }

  const login = async (email: string, password: string): Promise<AxiosResponse> => {
    const response = await client.login(email, password)

    if (response.status === 200 && response.headers) {
      const jwtFromHeader = response.headers.authorization as string | undefined;
      if (jwtFromHeader) {
        Cookies.set('jwt_authorization', jwtFromHeader)
        loginFromToken(jwtFromHeader)
      }
    }

    setAuthLoading(false)
    return response
  }

  const loginFromToken = (token: string) => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token)
      const isExpired = decodedToken.exp * 1000 < Date.now()
      if (!isExpired) {
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
    } else {
      setAuthLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, client, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
