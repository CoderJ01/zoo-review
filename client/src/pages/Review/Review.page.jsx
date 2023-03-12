import React from 'react';
import { useState } from 'react';

const Review = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title)
        console.log(content)
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
                    <text>Upload image here</text>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export default Review;