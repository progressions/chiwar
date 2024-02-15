import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from "universal-cookie";

export default function RequireAuth({ children }) {
  const [jwt, setJwt] = useState(null)
  const cookies = new Cookies()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = cookies.get("jwt_authorization")
    console.log("RequireAuth useEffect", token)
    if (token) {
      setJwt(token)
    } else {
      navigate("/login", { state: { path: location.pathname } })
    }
  }, [])

  return children
}
