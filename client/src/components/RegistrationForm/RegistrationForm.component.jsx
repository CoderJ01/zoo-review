import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const buttonStyle = {
    backgroundColor: 'rgb(34, 191, 41)', 
    border: '2px solid rgb(34, 191, 41)', 
    color: 'white'
}

const RegistrationForm = ({ showSignup, handleCloseSignup }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = 'http://localhost:3000/';
        const formData = new FormData();

        formData.append('file', file);
        formData.append('fileName', file.name);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <Modal show={showSignup} onHide={handleCloseSignup}>
            <Modal.Header closeButton>
                <Modal.Title>Register Here!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='firstname'>First Name:</label><br/>
                        <input type='text' name='firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='lastname'>Last Name:</label><br/>
                        <input type='text' name='lastname' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='username'>Username:</label><br/>
                        <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label><br/>
                        <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='passowrd'>Password:</label><br/>
                        <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='file'>Avatar:</label><br/>
                        <input type='file' name='file' onChange={(e) => setFile(e.target.value)}/>
                    </div>
                    <Button type='submit' style={buttonStyle} onClick={handleCloseSignup}>
                        Sign up
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default RegistrationForm;