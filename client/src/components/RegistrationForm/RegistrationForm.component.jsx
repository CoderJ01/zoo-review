import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const buttonStyle = {
    backgroundColor: 'rgb(34, 191, 41)', 
    border: '2px solid rgb(34, 191, 41)', 
    color: 'white'
}

const RegistrationForm = ({ showSignup, handleCloseSignup }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Modal show={showSignup} onHide={handleCloseSignup}>
            <Modal.Header closeButton>
                <Modal.Title>Register Here!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button style={buttonStyle} onClick={handleCloseSignup}>
                    Sign up
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RegistrationForm;