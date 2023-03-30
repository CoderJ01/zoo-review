// React
import React, { useState } from 'react';

// CSS
import './RegistrationForm.style.css';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import Button from 'react-bootstrap/Button';
import Cookie from 'universal-cookie';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const modalHeaderStyle = {
    display: 'flex', 
    justifyContent: 'center'
}

const buttonStyle = {
    backgroundColor: 'rgb(34, 191, 41)', 
    border: '2px solid rgb(34, 191, 41)', 
    color: 'white',
    marginLeft: '80%'
}

const RegistrationForm = ({ showSignup, handleCloseSignup }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    // const [file, setFile] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append('file', formData);

        // try {
        //     const response = await axios.post(
        //         `${baseURL}/users/register`,
        //         formData, {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data'
        //             }
        //         }
        //     );
        //     console.log(response.data);
        //     console.log(response);
        // }
        // catch(error) {
        //     console.log(error);
        // }

        axios.post(baseURL + '/auth/register', 
        {
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
            password: password,
            bio: bio,
            // avatar: file
        }, 
        {
            withCredentials: true,
            credentials: 'include'
        }
        )
        .then(
            response => {
                const cookies = new Cookie();
                cookies.set(
                    'zelp-cookie', 
                    response.data.data.randomString, 
                    { 
                        path: baseURL,
                        maxAge: response.data.session.cookie.originalMaxAge,
                        sameSite: response.data.session.cookie.sameSite
                    }
                );
                console.log(response.data.data.randomString);
                window.location.reload(false);
            }, 
            error => {
                alert(error);
            }
        );
    }

    // const handleFileSelect = (event) => {
    //     setFile(event.target.files[0]);
    // }

    return (
        <Modal show={showSignup} onHide={handleCloseSignup}>
            <Modal.Header style={modalHeaderStyle}>
                <Modal.Title>Register Here!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='registration-form' onSubmit={handleSubmit}>
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
                        <label htmlFor='bio'>Bio:</label><br/>
                        <textarea maxLength={200} type='text' name='bio' value={bio} onChange={(e) => setBio(e.target.value)}/>
                    </div>
                    {/* <div>
                        <label htmlFor='file'>Avatar:</label><br/>
                        <input type='file' name='file' onChange={handleFileSelect}/>
                    </div> */}
                    <Button type='submit' style={buttonStyle} onClick={handleCloseSignup}>
                        Sign up
                    </Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default RegistrationForm;