import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');

  };

  return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">Your Details</a>
      <div  className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
              {/* <Link className='btn' to={'/'} >Logout</Link> */}
              <button className='btn' onClick={handleLogout} >Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  )
}

export default Header