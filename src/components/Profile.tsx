import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const currentUser = user as any

  if (!user) return null;
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {currentUser.first_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
