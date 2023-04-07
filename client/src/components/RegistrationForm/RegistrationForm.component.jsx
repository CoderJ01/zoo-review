// React
import React, { useState } from 'react';

// CSS
import './RegistrationForm.style.css';

// util
import { isValidEmail } from '../../utils/emailValidation';

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
    const [count, setCount] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!firstName || !lastName || !username || !email || !password) {
            alert('All required fields need to be filled in!');
            return;
        }

        if(!isValidEmail(email)) {
            alert('Email is not valid!');
            return;
        }

        if(password.length < 8) {
            alert('Password must be at least 8 characters!');
            return;
        }
       
        axios.post(baseURL + '/auth/register', 
        {
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
            password: password,
            bio: bio,
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
                alert(error.response.data.msg);
            }
        );
    }

    const handleBio = (e) => {
        setBio(e.target.value)
        setCount(e.target.value.length);
    }

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
                        <label htmlFor='passowrd'>Password (8+ characters):</label><br/>
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='bio'>Bio (optional, {count}/200):</label><br/>
                        <textarea maxLength={200} type='text' name='bio' value={bio} onChange={handleBio}/>
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