import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './RegistrationForm.style.css'

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

const baseURL = 'http://localhost:3001';

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

        axios.post(baseURL + '/users/register', {
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
            password: password,
            bio: bio,
            // avatar: file
        })
        .then(
            response => {
                console.log('You have successfully been registered!');
            }, 
            error => {
                alert(error.response.data.msg);
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