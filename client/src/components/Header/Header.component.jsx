import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 
import './Header.style.css'
import Button from 'react-bootstrap/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm.component';
import LoginForm from '../LoginForm/LoginForm';
import Cookie from 'js-cookie';

const buttonStyle = {
    backgroundColor: 'white', 
    border: '1px solid white',
    borderRadius: '10px',
    color: 'rgb(29, 146, 34)',
    height: '100%', 
    width: '100%' 
}

const Header = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleCloseLogin = () => setShowLogin(false);

    const username = Cookie.get('zelp-cookie');

    const handleLogout = (event) => {
        event.preventDefault();
        Cookie.remove('zelp-cookie');
        window.location.reload(false);
    }

    return (
        <header>
            <nav>
                <NavLink to='/'><h1>Zelp</h1></NavLink>
                {
                    !username ? 
                    (
                        <>
                            <div className='header-buttons'>
                                <div className='header-vanilla-button'>
                                    <Button style={buttonStyle} onClick={handleShowSignup}>
                                        <div className='header-vanilla-button-text'>Sign Up</div>
                                    </Button>
                                </div>
                                <div className='header-vanilla-button'>
                                    <Button style={buttonStyle} onClick={handleShowLogin}>
                                        <div className='header-vanilla-button-text'>Log In</div>
                                    </Button>
                                </div>
                                <RegistrationForm showSignup={showSignup} handleCloseSignup={handleCloseSignup}/>
                                <LoginForm showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>
                            </div>
                        </>
                    ) : 
                    (
                        <>
                            <text className='header-greeting'>Hello, {username}</text>
                            <div className='header-links'>
                                <NavLink to='/post-blog'><text>Post a Blog</text></NavLink>
                                <NavLink to='/write-review'><text>Write a Review</text></NavLink>
                                <NavLink to='/dashboard'><text>Dashboard</text></NavLink>
                            </div>
                            <div className='header-buttons-logout'>
                                <div className='header-vanilla-button'>
                                    <Button style={buttonStyle} onClick={handleLogout}>
                                        <div className='header-vanilla-button-text'>Log Out</div>
                                    </Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </nav>
            <Outlet/>
        </header>
    );
}

export default Header;