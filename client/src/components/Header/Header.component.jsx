import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 
import './Header.style.css'
import Button from 'react-bootstrap/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm.component';

const Header = () => {
    const [showSignup, setShowSignup] = useState(false);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

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
                    <div className='header-vanilla-button'>
                        <Button 
                            style={{
                                backgroundColor: 'white', 
                                border: '1px solid white',
                                borderRadius: '10px',
                                color: 'rgb(29, 146, 34)',
                                height: '100%', 
                                width: '100%' 
                            }} 
                            onClick={handleShowSignup}
                        >
                            <div className='header-vanilla-button-text'>Sign Up</div>
                        </Button>
                    </div>
                    <RegistrationForm showSignup={showSignup} handleCloseSignup={handleCloseSignup}/>
                </div>
                <input></input>
            </nav>
            <Outlet/>
        </header>
    );
}

export default Header;