import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        { user && (<>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/campaigns">Campaigns</Link></li>
        </>) }
        { !user && (
          <li><Link to="/login">Login</Link></li>
        ) }
      </ul>
    </nav>
  )
}
