import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('jc@email.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectPath = location.state?.path || '/'

  const handleLogin = async () => {
    const response = await login(email, password)
    if (response.status === 200) {
      navigate(redirectPath, { replace: true })
    } else {
      console.log(response.response.data)
      setError(response.response.data)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        { error && <div style={{color: "red"}}>{error}</div> }
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
