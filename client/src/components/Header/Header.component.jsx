import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 
import './Header.style.css'

const Header = () => {
    return (
        <header>
            <nav>
                <NavLink to='/'><h1>Zelp</h1></NavLink>
                <div className='header-links'>
                    <NavLink to='/post-blog'><text>Post a Blog</text></NavLink>
                    <NavLink to='/write-review'><text>Write a Review</text></NavLink>
                    <NavLink to='/dashboard'><text>Dashboard</text></NavLink>
                </div>
                <div className='header-buttons'>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
                <input></input>
            </nav>
            <Outlet/>
        </header>
    );
}

export default Header;