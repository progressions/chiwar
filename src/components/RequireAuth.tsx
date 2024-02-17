import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { state: { path: location.pathname } })
    }
  }, [isLoading, user])

  return children
}
