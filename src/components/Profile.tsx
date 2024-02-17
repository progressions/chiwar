import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  if (!user) return null;
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {user.first_name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
