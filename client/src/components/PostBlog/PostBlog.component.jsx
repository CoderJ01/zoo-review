import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../PostReview/PostReview.style.css'

const PostBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <h1>Write a Blog Post</h1>
            <div>
                <label htmlFor='title'>Title:</label><br/>
                <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='content'>Content:</label><br/>
                <textarea type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
            {/* <div>
                <label htmlFor='file'></label><br/>
                <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])}/>
            </div> */}
            <button type='submit'>+ New Blog</button>
        </form>
    );
}

export default PostBlog;