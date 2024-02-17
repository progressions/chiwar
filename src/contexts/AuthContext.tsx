import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import type { User } from '@/types/types'

interface AuthContextType {
  jwt: string | null
  user: User | null
  logout: () => void
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

  const logout = () => {
    Cookies.remove('jwt_authorization')
    setJwt(null)
    setUser(null)
  }

  useEffect(() => {
    const jwtFromCookie = Cookies.get('jwt_authorization')
    if (jwtFromCookie) {
      try {
        const decodedToken: DecodedToken = jwtDecode(jwtFromCookie)
        const isExpired = decodedToken.exp * 1000 < Date.now()
        if (!isExpired) {
          console.log(decodedToken)
          setJwt(jwtFromCookie)
          // Optionally set the user
          setUser(decodedToken)
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
  }, [])

  return (
    <AuthContext.Provider value={{ jwt, user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
