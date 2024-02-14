import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectPath = location.state?.path || '/'

  const handleLogin = async () => {
    await login(email, password)
    navigate(redirectPath, { replace: true })
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>
          Username
          &nbsp;
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password
          &nbsp;
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
