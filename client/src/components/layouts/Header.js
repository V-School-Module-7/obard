import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='header'>
      <div className='wrapper'>
          <div className='header__logo'>
              O-D
          </div>
          <nav className='header__nav'>
              <Link className='header__nav-link' to='/'>Home</Link>
              <Link className='header__nav-link' to='/signup'>Signup</Link>
              <Link className='header__nav-link' to='/login'>Login</Link>
          </nav>
      </div>
  </header>
);

export default Header;