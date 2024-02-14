import { useAuth } from './auth'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
