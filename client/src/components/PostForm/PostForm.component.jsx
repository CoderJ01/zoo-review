import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ratings } from './PostForm.utils';
import './PostForm.style.css'

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [selected, setSelected] = useState(ratings[0]);

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
            <div>
                <label htmlFor='file'></label><br/>
                <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button type='submit'>+ New Review</button>
        </form>
    );
}

export default PostForm;