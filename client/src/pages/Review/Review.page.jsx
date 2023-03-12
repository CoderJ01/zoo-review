import React from 'react';
import { useState } from 'react';
// import axios from 'axios';

const Review = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();
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
                    <label htmlFor='file'>File:</label><br/>
                    <input type="file" name="file" value={file} onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Review;