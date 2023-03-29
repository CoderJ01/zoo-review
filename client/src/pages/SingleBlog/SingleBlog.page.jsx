import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './SingleBlog.style.css';

const baseURL = 'http://localhost:3001';

const SingleBlog = () => {
    const { blogId } = useParams();

    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [likes, setLikes] = useState(0);

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
                setLikes(response.data.data.thumbs);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [blogId]);

    useEffect(() => {
        fetchBlogById();
    }, [fetchBlogById]);

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
                    <div className='post-info-thumbs'>
                        <i class="fa fa-thumbs-up"></i>
                        <i class="fa fa-thumbs-down" style={{marginLeft: '1vw'}}></i>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBlog;