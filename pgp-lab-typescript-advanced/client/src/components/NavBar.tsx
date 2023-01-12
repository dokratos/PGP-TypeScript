import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header className='bg-slate-600'>
      <nav className='flex justify-between mx-2 h-24'>
        <h1 className='font-medium leading-tight text-5xl self-end'>Store App</h1>
        <div className='self-end'>
          <Link to='/'>Home  </Link>
          <Link to='/cart/1' className='text-decoration-line: none '>Cart</Link>
        </div>
      </nav>
    </header>
  )
}
