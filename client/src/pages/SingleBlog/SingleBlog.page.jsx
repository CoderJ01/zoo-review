// React
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

// CSS 
import './SingleBlog.style.css';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const SingleBlog = ({ loggedUser }) => {
    const { blogId } = useParams();

    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');

    const fetchBlogById = useCallback(async () => {
        const id = blogId;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-blog/${id}`);
                setTitle(response.data.data.title);
                setUser(response.data.user);
                setContent(response.data.data.content);
                setDate(response.data.data.updatedAt.toString().substring(0, 10));
                setEmail(response.data.email);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [blogId]);

    useEffect(() => {
        fetchBlogById();
    }, [fetchBlogById]);

    const handleThumbsUp = () => {
        console.log('Thumbs up');
    }

    const handleThumbsDown = () => {
        console.log('Thumbs down');
    }

    return (
        <div className='single-blog'>
            <div className='single-blog-display'>
                <div className='single-blog-display-header'>
                    <h1>{title}</h1>
                    <h2>by {user}</h2>
                </div>
                <div className='single-blog-display-body'>
                    <p>{content}</p>
                </div>
                <div className='single-blog-display-footer'>
                    <div className='sbdf-static-info'>
                        <text>{date}</text>
                        <p>{email}</p>
                    </div>
                    <div className='sbdf-dynamic-info'>
                    {
                        loggedUser.length === 0 ? 
                        (
                            ''
                        ) : 
                        (
                            <div className='post-info-thumbs'>
                                <i class='fa fa-thumbs-up' onClick={handleThumbsUp}></i>
                                <i class='fa fa-thumbs-down' style={{marginLeft: '1vw'}} onClick={handleThumbsDown}></i>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBlog;