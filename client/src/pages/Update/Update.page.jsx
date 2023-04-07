// React
import React, { useState } from 'react';

// CSS
import './Update.style.css';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';

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

        if(imageUpload != null) {
            setConfirmed(true);
            const imageRef = ref(storage, `images/avatars/${imageUpload.name + v4()}`);

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
        },  
        )
        .then(
            response => {
                console.log(response.data);
            }, 
            error => {
                alert(error);
            }
        );
    }
    return (
        <div className='update'>
            <form className='update-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label><br/>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='u-upload-image'>
                <input 
                    type='file'
                    onChange={uploadImage} 
                />
                </div>
                <div className='u-confirm-upload'>
                    <label htmlFor='radio'>Confirm image</label><br/>
                    <input type='radio' name='radio' onChange={confirmUpload}/>
                </div>
            </form>
        </div>
    );
}

export default Update;