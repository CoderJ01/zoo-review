// React
import React, { useState } from 'react';

// CSS
import './Update.style.css';

// components
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';

// URL
import { baseURL } from '../../URLs/urls';
import { isValidEmail } from '../../utils/emailValidation';

// utils
import { deleteFirebaseImage, storeFirebaseImage } from '../../utils/processFirebaseImage';
import { cloudString } from '../../utils/cloudString';

// other imports
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';

const buttonStyle = {
    backgroundColor: 'rgb(34, 191, 41)', 
    border: '2px solid rgb(34, 191, 41)', 
    color: 'white',
    marginLeft: '80%',
    marginTop: '2vh'
}

const Update = ({ user }) => {
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [count, setCount] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
        alert('The image has been uploaded! Confirm the upload, then wait a few seconds to submit the form!');
    }

    const confirmUpload = () => {
        if(imageUpload !== null) {
            const imageRef = ref(storage, `images/avatars/${imageUpload.name + cloudString + v4()}`);
            storeFirebaseImage(imageUpload, setConfirmed, imageRef, setImageUrl);
            deleteFirebaseImage(user.avatar);
        }
        else {
            alert('An upload is needed for a confirmation!');
            window.location.reload(false);
            return;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email !== '' && !isValidEmail(email)) {
            alert('Email is not valid!');
            return;
        }

        if(imageUpload != null && confirmed === false) {
            alert('The upload needs to be confirmed so that image will process successfully!');
            return;
        }

        if(confirmed && imageUrl === '') {
            alert('Image has not been fully processed yet! Wait a few more seconds!');
            return;
        }

        if(email === '' && bio === '' && imageUrl === '') {
            alert('Please fill in at least one field!');
            return;
        }
       
        axios.put(baseURL + `/update/${user._id}`, 
        {
            email: email,
            avatar: imageUrl,
            bio: bio
        },  
        )
        .then(
            response => {
                alert(response.data.msg);
                window.location.reload(false);
            }, 
            error => {
                alert(error);
            }
        );
        
        // This ensures that the correct image is uploaded. At times, the wrong image is oddly stored in the 
        // User object
        setImageUpload(null); 
    }

    const handleBio = (e) => {
        setBio(e.target.value)
        setCount(e.target.value.length);
    }

    return (
        <>
        {
            user.length === 0 ? 
            (
                <AccessDenied/>
            ) : 
            (
                <div className='update'>
                    <form className='update-form' onSubmit={handleSubmit}>
                        <h1>Update Info</h1>
                        <div>
                            <label htmlFor='email'>Email:</label><br/>
                            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='update-form-bio'>
                            <label htmlFor='bio'>Bio ({count}/200):</label><br/>
                            <textarea maxLength={200} type='text' name='bio' value={bio} onChange={handleBio}/>
                        </div>
                        <div className='uf-upload-image'>
                        <input 
                            type='file'
                            onChange={uploadImage} 
                        />
                        </div>
                        <div className='uf-confirm-upload'>
                            <label htmlFor='radio'>Confirm image</label><br/>
                            <input type='radio' name='radio' onChange={confirmUpload}/>
                        </div>
                        <div className='uf-button'>
                            <Button type='submit' style={buttonStyle} >
                                <text>Update</text>
                            </Button>
                        </div>
                    </form>
                </div>
            )
        }
        </>
    );
}

export default Update;