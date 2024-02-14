import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
