import React from 'react';
import '../App.css';
import {Link} from'react-router-dom'

function Nav() {

    const navStyle ={
        color: 'white'
    }


  return (
    <nav>
        <h1>Logo</h1>
        <ul className='nav-Links'>
            <Link style= {navStyle} to='/about'>
                <li>About</li>
            </Link>
            <Link style= {navStyle} to='/shop'>
                <li>Shop</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
