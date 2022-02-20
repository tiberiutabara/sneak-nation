import { NavLink } from 'react-router-dom'

// styles
import './Navbar.scss'

// media
import Logo from '../../Media/Logo.png'

export default function Navbar({ user, logout }) {
  return (
    <nav>
      <img src={Logo} />

      <ul>
        <li><NavLink activeclassname="active" to="/">Home</NavLink></li>

        <li><NavLink activeclassname="active" to="/products">Products</NavLink></li>

        <li><NavLink activeclassname="active" to="/cart">Cart</NavLink></li>
      </ul>

      <ul className='admin-ul'>
        {user && (<li><NavLink activeclassname="active" to="/admin">Admin</NavLink></li>)}

        {!user && (<li><NavLink activeclassname="active" to="/login">Login</NavLink></li>)}

        {user && (<li onClick={logout} style={{ cursor: 'pointer' }}>Log out</li>)}
      </ul>
    </nav>
  )
}