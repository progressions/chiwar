import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { path: location.pathname } })
    }
  }, [])

  return children
}
