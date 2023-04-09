// React
import React, { useState} from 'react';

// CSS
import '../PostReview/PostReview.style.css';

// URL
import { baseURL } from '../../URLs/urls';

// utils
import { storeFirebaseImage } from '../../utils/processFirebaseImage';
import { cloudString } from '../../utils/cloudString';

// other imports
import axios from 'axios';
import { ref } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';

const PostBlog = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [count, setCount] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
        alert('The image has been uploaded! Confirm the upload, then wait a few seconds to submit the blog!');
    }

    const confirmUpload = () => {
        if(imageUpload !== null) {
            const imageRef = ref(storage, `images/blogs/${imageUpload.name + cloudString + v4()}`);
            storeFirebaseImage(imageUpload, setConfirmed, imageRef, setImageUrl);
        }
        else {
            alert('An upload is needed for a confirmation!');
            window.location.reload(false);
            return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!title) {
            alert('A title is needed!');
            return;
        }

        if(content.length < 500) {
            alert('The blog needs to be at least 500 characters!');
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

        axios.post(baseURL + `/post-blog/${user._id}`, 
            {
                title: title,
                content: content,
                image: imageUrl
            }
        )
        .then(
            response => {
                alert(response.data.msg);
                window.location.reload(false);
            },
        )
        .catch(
            error => {
                console.log(error);
            }
        );
    }

    const handleContent = (e) => {
        setContent(e.target.value);
        setCount(e.target.value.length);
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <h1>Write a Blog Post</h1>
            <div>
                <label htmlFor='title'>Title:</label><br/>
                <input maxLength={50} type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
            {
                count === 0 ? 
                (
                    <>
                        <label htmlFor='content'>Content (500+ characters, {count}):</label><br/>
                    </>
                ) : 
                (
                    count > 0 && count < 500 ? 
                    (
                        <>
                            <label htmlFor='content'>Content (500+ characters, <span style={{ color: 'rgb(223, 33, 33)' }}>{count}</span>):</label><br/>
                        </>
                    ) : 
                    (
                        <>
                            <label htmlFor='content'>Content (500+ characters, <span style={{ color: 'rgb(34, 191, 41)' }}>{count}</span>):</label><br/>
                        </>
                    )
                )
            }
                <textarea type='text' name='content' value={content} onChange={handleContent}/>
            </div>
            <div className='pf-upload-image'>
                <input 
                    type='file'
                    onChange={uploadImage} 
                />
            </div>
            <div className='pf-confirm-upload'>
                <label htmlFor='radio'>Confirm image</label><br/>
                <input type='radio' name='radio' onChange={confirmUpload}/>
            </div>
            <button type='submit'>+ New Blog</button>
        </form>
    );
}

export default PostBlog;