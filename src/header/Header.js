import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/sleepwell-logo.png';

const Header = () => (
  <header>
    <img width='150' src={logo} alt='Hypnos Logo'/>
    <nav>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink exact to='/dashboard'>Dashboard</NavLink>
      <NavLink exact to='/settings'>Settings</NavLink>
    </nav>
  </header>
);

export default Header;

