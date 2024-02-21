import React, { ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "@/contexts/AuthContext"

type RequireAuthProps = {
  children: ReactNode // This allows anything that React can render
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, authLoading } = useAuth() // Assuming useAuth is correctly typed based on Step 1

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!authLoading && !user) {
      navigate("/login", { state: { from: location.pathname } })
    }
  }, [authLoading, user, navigate, location.pathname])

  return <>{children}</>
}

export default RequireAuth
