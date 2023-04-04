// React
import React, { useState} from 'react';

// CSS
import '../PostReview/PostReview.style.css';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const PostBlog = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseURL + `/post-blog/${user._id}`, 
            {
                title: title,
                content: content
            }
        )
        .then(
            response => {
                alert(response.data.msg);
            },
        )
        .catch(
            error => {
                console.log(error);
            }
        );
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
            <button type='submit'>+ New Blog</button>
        </form>
    );
}

export default PostBlog;