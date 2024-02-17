// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  // const currentUser = user as any

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

