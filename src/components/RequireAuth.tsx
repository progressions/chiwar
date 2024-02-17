import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth({ children }) {
  const [jwt, setJwt] = useState(null)
  const cookies = new Cookies()
  const navigate = useNavigate()
  const location = useLocation()
  const { validateToken } = useAuth()

  useEffect(() => {
    if (!validateToken()) {
      navigate("/login", { state: { path: location.pathname } })
    }
  }, [])

  return children
}
