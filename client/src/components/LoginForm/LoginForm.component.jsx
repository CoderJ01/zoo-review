// React
import React, { useState } from 'react';

// CSS
import '../RegistrationForm/RegistrationForm.style.css';

// URLs
import { baseURL } from '../../URLs/urls';

// others
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { setCookie } from '../../utils/cookie';

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

const LoginForm = ({ showLogin, handleCloseLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        axios.post(baseURL + '/auth/login', 
        {
            username: username,
            password: password,
        }, 
        {
            withCredentials: true,
            credentials: 'include'
        }
        )
        .then(
            response => {
                setCookie('zelp-cookie', response.data.data.randomString, 1);
                console.log(response.data.data.randomString);
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
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
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