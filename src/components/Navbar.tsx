import { useAuth } from "@/contexts/AuthContext";
import { Link, LinkProps } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        { user && (<>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/campaigns">
              Campaigns
            </Link>
          </li>
          <li>
            <Link to="/campaigns">
              Campaigns
            </Link>
          </li>
          <li>
            <Link to="/fights">
              Fights
            </Link>
          </li>
          <li>
            <Link to="/fights">
              Fights
            </Link>
          </li>
          </>) }
          { !user && (<>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>
          </>)}
          { user && (<>
            <li>
              <button onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>)}
        </ul>
    </nav>
  )
}
