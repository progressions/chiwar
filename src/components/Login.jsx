import { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login(user)
    navigate('/')
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
