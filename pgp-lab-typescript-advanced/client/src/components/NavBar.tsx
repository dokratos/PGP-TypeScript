import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header>
      <h1>E-commerce Store App</h1>
      <nav>
        <Link to='/cart/1'>Cart</Link>
        <Link to='/'>Home</Link>
      </nav>
    </header>
  )
}
