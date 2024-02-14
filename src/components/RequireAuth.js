import { useAuth } from '../contexts/auth'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />
  }
  return children
}
