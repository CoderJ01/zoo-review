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
import { cloudString } from '../../utils/cloudString';

// other imports
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';
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
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
        alert('The image has been uploaded! Confirm the upload, then wait a few seconds to submit the form!');
    }

    const confirmUpload = () => {
        if(user.avatar.includes(cloudString)) {
            const stored = getStorage();
            const imageRef = ref(stored, user.avatar);
            deleteObject(imageRef).then(() => {
                console.log('Old avatar has been deleted!');
            }).catch(error => console.log(error))
        }

        if(imageUpload != null) {
            setConfirmed(true);
            const imageRef = ref(storage, `images/avatars/${imageUpload.name + cloudString + v4()}`);

            uploadBytes(imageRef, imageUpload)
            .then(() => {
                alert('Image confirmed! Wait a few seconds for it to process!');
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            alert('You have not uploaded an image!');
            window.location.reload(false);
            return;
        }

        listAll(imageListRef)
        .then(response => {
            response.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setImageUrl(url);
                });
            })
        });
    }

    const imageListRef = ref(storage, 'images/avatars/');

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
       
        axios.put(baseURL + `/update/${user._id}`, 
        {
            email: email,
            avatar: imageUrl
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