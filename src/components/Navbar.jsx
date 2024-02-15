import { useAuth } from "../contexts/auth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        { user && (<>
          <li><Link to="/campaigns">Campaigns</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </>) }
        { !user && (
          <li><Link to="/login">Login</Link></li>
        ) }
      </ul>
    </nav>
  );
}
