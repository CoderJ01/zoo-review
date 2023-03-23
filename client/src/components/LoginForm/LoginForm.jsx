import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../RegistrationForm/RegistrationForm.style.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const modalHeaderStyle = {
    display: 'flex', 
    justifyContent: 'center'
}

const buttonStyle = {
    backgroundColor: 'rgb(34, 191, 41)', 
    border: '2px solid rgb(34, 191, 41)', 
    color: 'white',
    marginLeft: '80%',
    marginTop: '3vh'
}

const baseURL = 'http://localhost:3001';

const LoginForm = ({ showLogin, handleCloseLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        axios.post(baseURL + '/auth/login', {
            username: username,
            password: password,
        }, {withCredentials: true})
        .then(
            response => {
                const cookies = new Cookies();
                cookies.set(
                    'zelp-cookie', 
                    response.data.data.username, 
                    { 
                        path: baseURL,
                        maxAge: response.data.session.cookie.originalMaxAge,
                        sameSite: response.data.session.cookie.sameSite
                    }
                );
                window.location.reload(false);
            }, 
            error => {
                alert(error.response.data);
            }
        );
    }

    return (
        <Modal show={showLogin} onHide={handleCloseLogin}>
            <Modal.Header style={modalHeaderStyle}>
                <Modal.Title>Login Here!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='registration-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username:</label><br/>
                        <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='passowrd'>Password:</label><br/>
                        <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Button type='submit' style={buttonStyle} onClick={handleCloseLogin}>
                        Login in
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginForm;