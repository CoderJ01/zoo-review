import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'; 
import './Header.style.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    {/* <button>Log In</button> */}
                    {/* <button>Sign Up</button> */}
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
                            onClick={handleShow}
                        >
                            <div className='header-vanilla-button-text'>Launch demo modal</div>
                        </Button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                    </Modal>
                </div>
                <input></input>
            </nav>
            <Outlet/>
        </header>
    );
}

export default Header;