import { useMemo, useCallback, useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";
import type { User } from "@/types/types";
import Client from "@/utils/Client";

export type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  jwt: JwtPayload | null
}

export type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({ user: null, login: async (email: string, password: string) => {}, logout: () => {}, jwt: null })

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const cookies = useMemo(() => new Cookies(), [])
  const [user, setUser] = useState<User | null>(null)

  const jwt = cookies.get("jwt_authorization")
  let decoded
  let valid = false
  try {
    decoded = jwtDecode(jwt) as JwtPayload;
    valid = (decoded.exp || 0) * 1000 > Date.now()
  } catch (error) {
    console.log("error", error)
  }

  const client = useMemo(() => (new Client({ jwt })), [jwt])

  useEffect(() => {
    if (valid) {
      setUser(decoded as User)
    }
  }, [valid])

  const login = async (email: string, password: string): Promise<void> => {
    const response = await client.login(email, password)

    if (response.status === 200) {
      const authToken = response.headers.get('authorization')
      const decoded = jwtDecode(authToken)
      if (!decoded) return
      cookies.set("jwt_authorization", authToken, {
        expires: new Date((decoded.exp || 0) * 1000),
      })
      setUser(decoded as User)
    }

    return response
  }

  const logout = (): void => {
    setUser(null)
    cookies.remove("jwt_authorization")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, jwt: valid ? jwt : null, client }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
