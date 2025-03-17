import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Quiz App</div>
      <div className="profile">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-img"
        />
      </div>
    </nav>
  );
}

export default Navbar;
