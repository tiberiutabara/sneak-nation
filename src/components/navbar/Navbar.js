import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

// styles
import './Navbar.scss'

// media
import Logo from '../../Media/Logo.png'

export default function Navbar({ user, logout }) {
  const [activeMenu, setActiveMenu] = useState(false)

  const toggleMenu = () => {
    setActiveMenu(!activeMenu)
  }

  useEffect(() =>{
    setActiveMenu(!activeMenu)
  }, [])

  return (
    <nav className={activeMenu ? null : 'bg-overlay'}>
      <img src={Logo} />

      <button className='menu-button btn' onClick={toggleMenu}>{activeMenu ? 'MENU' : 'CLOSE'}</button>

      <ul className={activeMenu ? 'menu' : 'nav-overlay'}>
        <li onClick={toggleMenu}><NavLink activeclassname="active" to="/">Home</NavLink></li>

        <li onClick={toggleMenu}><NavLink activeclassname="active" to="/products">Products</NavLink></li>

        <li onClick={toggleMenu}><NavLink activeclassname="active" to="/cart">Cart</NavLink></li>
      </ul>

      <ul className={activeMenu ? 'menu admin-ul' : 'admin-ul nav-overlay'}>
        {user && (<li onClick={toggleMenu}><NavLink activeclassname="active" to="/admin">Admin</NavLink></li>)}

        {!user && (<li onClick={toggleMenu}><NavLink activeclassname="active" to="/login">Login</NavLink></li>)}

        {user && (<li onClick={() => {logout(); toggleMenu()}} style={{ cursor: 'pointer' }}>Log out</li>)}
      </ul>
    </nav>
  )
}