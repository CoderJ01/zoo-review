import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const PostBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = 'http://localhost:3000/write-review';
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
        <form className='post-form' onSubmit={handleSubmit}>
            <h1>Write a Review</h1>
            <div>
                <label htmlFor='title'>Title:</label><br/>
                <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='content'>Content:</label><br/>
                <textarea type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='file'></label><br/>
                <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type='submit'>+ New Review</button>
        </form>
    );
}

export default PostBlog;