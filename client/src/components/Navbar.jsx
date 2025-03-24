import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useContext } from 'react';
import { userLoginContext } from '../contexts/userLoginContext';
import NotificationBell from './notifications/NotificationBell'; // Import Notification Bell

function Navbar() {
  let { logoutUser, userLoginStatus } = useContext(userLoginContext); 

  return (
    <div className='header d-flex justify-content-between align-items-center'>
      
      <Link to="/">
        <div className="logo-imge d-flex">
          <h1>Carely</h1>
        </div>
      </Link>
      
      <ul className="nav d-flex gap-3">
        <li className="nav-item links">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item links">
          <Link to="explore">Explore</Link>
        </li>
        <li className="nav-item links">
          <Link to="assist">Assist</Link>
        </li>
        <li className="nav-item links">
          <Link to="mediNotify">MediNotify</Link>
        </li>

        {userLoginStatus === false ? (
          <li className="nav-item links">
            <Link to="auth">Login/Register</Link>
          </li>
        ) : (
          <>
            <li className="nav-item links">
              <Link to="auth" onClick={logoutUser}>Logout</Link>
            </li>
          </>
        )}
      </ul>

      {/* Notification Bell Component */}
      <div className="nav-item links">
        <NotificationBell />
      </div>
    </div>
  );
}

export default Navbar;
