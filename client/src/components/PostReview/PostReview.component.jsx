import React from 'react';
import { useState } from 'react';
import { ratings } from './PostReview.utils';
import './PostReview.style.css'

const PostReview = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selected, setSelected] = useState(ratings[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
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
                <textarea maxLength={1000} type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
                <div>
                    <label htmlFor='rating'>Rating:</label><br/>
                    <select 
                        value={selected} 
                        onChange={e => setSelected(e.target.value)}
                    >
                        {ratings.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                </div>
            <button type='submit'>+ New Review</button>
        </form>
    );
}

export default PostReview;