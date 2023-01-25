import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');

  };
  return (
    <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">Admin Panel</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="dropdown-item">
                {/* <Link className='btn' to={'/'} >Logout</Link> */}
                <button className='btn' onClick={handleLogout} >Logout</button>
            </a>
            </li>
          </ul>
        </div>
      </nav>
</header>
  )
}

export default AdminHeader