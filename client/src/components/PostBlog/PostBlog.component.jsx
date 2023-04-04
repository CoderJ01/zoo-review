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

        if(!title) {
            alert('A title is needed!');
            return;
        }

        if(content.length < 500) {
            alert('The blog needs to be at least 500 characters!');
            return;
        }

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
                <label htmlFor='content'>Content (500+ characters):</label><br/>
                <textarea type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
            <button type='submit'>+ New Blog</button>
        </form>
    );
}

export default PostBlog;