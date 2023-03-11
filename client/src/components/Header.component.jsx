import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 

const Header = () => {
    return (
        <div>
            <nav>
                <NavLink to='/'><h1>Zelp</h1></NavLink>
                <input></input>
                <ul>
                    <li>
                      <NavLink to='/post-blog'>Post a Blog</NavLink>
                    </li>
                    <li>
                      <NavLink to='/write-review'>Write a Review</NavLink>
                    </li>
                </ul>
                <button>Log In</button>
                <button>Sign Up</button>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Header;