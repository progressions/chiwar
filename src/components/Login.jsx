import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectPath = location.state?.path || '/'

  const handleLogin = () => {
    login(user)
    navigate(redirectPath, { replace: true })
  }

  console.log(user)

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>
          Username:
          <input value={user} onChange={e => setUser(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
