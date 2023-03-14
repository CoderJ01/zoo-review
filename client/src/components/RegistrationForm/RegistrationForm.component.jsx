import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RegistrationForm = ({ showSignup, handleCloseSignup }) => {
    return (
        <Modal show={showSignup} onHide={handleCloseSignup}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSignup}>
                Close
                </Button>
                <Button variant="primary" onClick={handleCloseSignup}>
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RegistrationForm;