import React from 'react';
import { useState } from 'react';

const Review = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='review'>
            <form onSubmit={handleSubmit}>
                <h1>Write Your Review</h1>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='content'>Content:</label><br/>
                    <input type="text" name="content" onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='file'>Content:</label><br/>
                    <input type="file" name="file" onChange={(e) => setSelectedFile(e.target.value)}/>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Review;