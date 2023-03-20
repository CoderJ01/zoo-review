import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../RegistrationForm/RegistrationForm.style.css';
import axios from 'axios';

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
        axios.post(baseURL + '/users/login', {
            username: username,
            password: password,
        })
        .then(response => {console.log(response)}, error => {console.log(error)});
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