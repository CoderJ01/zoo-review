// React
import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 

// CSS
import './Header.style.css';

// components
import LoginForm from '../LoginForm/LoginForm.component';
import RegistrationForm from '../RegistrationForm/RegistrationForm.component';

// URLs
import { baseURL, baseURL_frontend } from '../../URLs/urls';

// other imports
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import cookie from 'js-cookie';

const buttonStyle = {
    backgroundColor: 'white', 
    border: '1px solid white',
    borderRadius: '10px',
    color: 'rgb(29, 146, 34)',
    height: '100%', 
    width: '100%' 
}

const Header = ({ user }) => {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [zooNames, setZooNames] = useState([]);
    const [pickedZoo, setPickedZoo] = useState(zooNames[0]);
    const [zoos, setZoos] = useState([]);
    const [zooId, setZooId] = useState(process.env.REACT_APP_DEFAULT_ZOO_ID);

    useEffect(() => { 
        const fetchZoos = async () => {
            try {
                const response = await axios.get(baseURL + '/zoos');
                setZoos(response.data);
            }   
            catch(error) {
                console.log(error)
            }
        }
        fetchZoos();
    }, []);

    const retrieveNames = useCallback(() => {
        let names = [];
        zoos.filter(zoo => {
            names.push(zoo.name);
            return zoo.name;
        });
        setZooNames(names);
    },[zoos, setZooNames]);

   useEffect(() => { 
        retrieveNames();
   }, [retrieveNames]);

   const getZooId = useCallback(() => {
        zoos.filter(zoo => {
            if(pickedZoo === zoo.name) {
                setZooId(zoo._id)
            }
            return zoo.name;
        })
    }, [zoos, pickedZoo, setZooId]);

    useEffect(() => {
        getZooId();
    }, [getZooId]);

    const handleShowSignup = () => setShowSignup(true);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleCloseLogin = () => setShowLogin(false);

    const handleLogout = (event) => {
        event.preventDefault();
        cookie.remove('zelp-cookie');
        window.location.reload(false);
    }
    
    return (
        <header>
            <nav>
                <NavLink to='/'><h1>Zelp</h1></NavLink>
                {
                    user.length === 0 ? 
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
                            <text className='header-greeting'>Hello, {user.username}</text>
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
                <div className='header-zoo-selection'>
                    <select 
                        value={pickedZoo} 
                        onChange={e => setPickedZoo(e.target.value)}
                    >
                        {zooNames.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                    <div className='header-button-see-zoo'>
                        <Button href={baseURL_frontend + `/zoo/${zooId}`} style={buttonStyle}>
                            <div className='header-vanilla-button-text'>See Zoo</div>
                        </Button>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </header>
    );
}

export default Header;