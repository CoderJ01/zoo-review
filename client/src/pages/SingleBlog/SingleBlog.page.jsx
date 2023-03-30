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
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

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

    useEffect(() => {
        if(loggedUser !== 0) {
            const checkLiked = () => {
                if(loggedUser.likedBlogs?.includes(blogId)) {
                    setLiked(true);
                }
                else {
                    setLiked(false)
                }
            }
            const checkDislike = () => {
                if(loggedUser.dislikedBlogs?.includes(blogId)) {
                    setDisliked(true);
                }
                else {
                    setDisliked(false)
                }
            }
            checkLiked();
            checkDislike();
        }
    }, [loggedUser, loggedUser.likedBlogs, loggedUser.dislikedBlogs, blogId]);

    let likedColor;
    let dislikedColor;

    if(liked === true) {
        likedColor = 'rgb(34, 191, 41)';
    }
    else {
        likedColor = '';
    }

    if(disliked === true) {
        dislikedColor = 'rgb(223, 33, 33)';
    }
    else {
        dislikedColor = '';
    }

    const handleThumbsUp = async () => {
        axios.put(baseURL + `/single-blog/like/${loggedUser._id}/${blogId}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
        window.location.reload(false);
    }

    const handleThumbsDown = () => {
        axios.put(baseURL + `/single-blog/dislike/${loggedUser._id}/${blogId}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
        window.location.reload(false);
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
                                <i class='fa fa-thumbs-up' onClick={handleThumbsUp} style={{ color: likedColor }}></i>
                                <i class='fa fa-thumbs-down' onClick={handleThumbsDown} style={{ color: dislikedColor }}></i>
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