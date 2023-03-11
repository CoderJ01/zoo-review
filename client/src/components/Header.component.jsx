import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 

const Header = () => {
    return (
        <div>
            <nav>
                <NavLink to='/'>Zelp</NavLink>
                <NavLink to='/post-blog'>Post a Blog</NavLink>
                <NavLink to='/write-review'>Write a Review</NavLink>
                <button>Log In</button>
                <button>Sign Up</button>
                <input></input>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Header;