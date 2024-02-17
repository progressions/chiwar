import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { path: location.pathname } })
    }
  }, [authLoading, user])

  return children
}
