import React from 'react';

import './Header.css';

function Header({ setPage }) {
  return (
    <header className="header">
      <div 
        className="header-logo"
        onClick={() => setPage('')}
      >
        CJ Website
      </div>
      <nav className="header-nav">
        <a onClick={() => setPage('')}>Home</a>
        <a onClick={() => setPage('about')}>About</a>
        <a onClick={() => setPage('snakeGame')}>SnakeGame</a>
        <a onClick={() => setPage('contact')}>Contact</a>
      </nav>
      {/* <div className="header-actions">
        <button className="btn-secondary">Log In</button>
        <button className="btn-primary">Get Started</button>
      </div> */}
    </header>
  );
}

export default Header;
