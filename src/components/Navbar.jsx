import { useAuth } from "../contexts/auth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/fights">Fights</Link></li>
        { user && (
          <li><Link to="/profile">Profile</Link></li>
        ) }
        { !user && (
          <li><Link to="/login">Login</Link></li>
        ) }
      </ul>
    </nav>
  );
}
