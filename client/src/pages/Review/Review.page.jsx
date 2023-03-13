import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Review.style.css'

const ratings = ['1', '2', '3', '4', '5'];

const Review = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [select, setSelected] = useState(ratings[0]);

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
        <div className='review'>
            <form onSubmit={handleSubmit}>
                <h1>Write Your Review</h1>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='content'>Content:</label><br/>
                    <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='file'></label><br/>
                    <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button type="submit">+ New Review</button>
            </form>
        </div>
    );
}

export default Review;