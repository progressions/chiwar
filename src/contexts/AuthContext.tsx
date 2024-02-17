import { useMemo, useCallback, useState, useEffect, createContext, useContext } from 'react';
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";
import type { User } from "@/types/types";

export type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  jwt: JwtPayload | null
  validateToken: () => string | false
}

export type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({ user: null, login: async (email: string, password: string) => {}, logout: () => {}, jwt: null, validateToken: () => false })

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const cookies = useMemo(() => new Cookies(), [])
  const [user, setUser] = useState<User | null>(null)
  const [jwt, setJwt] = useState<JwtPayload | null>(null)

  const validateToken = useCallback(() => {
    const token = cookies.get("jwt_authorization")
    if (token) {
      const decoded = jwtDecode(token) as JwtPayload;
      if ((decoded.exp || 0) * 1000 < Date.now()) {
        cookies.remove("jwt_authorization");
        return false; // Explicitly returning false here
      } else {
        setUser(decoded as User);
        setJwt(token);
        return token; // Returning the token if valid
      }
    }
    return false; // Make sure to return false or null explicitly if token is not present or valid
  }, [cookies])

  useEffect(() => {
    validateToken()
  }, [validateToken])

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
    <AuthContext.Provider value={{ user, login, logout, jwt, validateToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
