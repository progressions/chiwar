import { useAuth } from "@/contexts/AuthContext";
import { Link, LinkProps } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export const NavLink = ({ to, children }) => {
  return (
    <Link to={to}>
      {children}
    </Link>
  )
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav className="mb-4">
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        { user && (<>
        <li>
            <NavLink to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/campaigns">
              Campaigns
            </NavLink>
          </li>
          <li>
            <NavLink to="/fights">
              Fights
            </NavLink>
          </li>
          </>) }
          { !user && (<>
            <NavLink to="/login">
              Login
            </NavLink>
          </>)}
        </ul>
    </nav>
  )
}
