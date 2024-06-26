// React
import React, { useState, useEffect } from 'react';

// CSS
import './Post.style.css';

// util
import { displayImage, trashIcon } from './Post.util';
import { displayAvatar, displayRating, displayAdminText } from '../../utils/display';
import { deleteFirebaseImage } from '../../utils/processFirebaseImage';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const Post = ({ user, post, blog = false }) => {
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);

    let ratingDisplay = displayRating(post.rating);
    let avatar = displayAvatar(profileImage);
    let image = displayImage(blog, post);

    useEffect(() => {
        const id = post.user;

        if(id) {
            const getUserInfo = async () => {
                try {
                    const response = await axios.get(baseURL + `/users/${id}`);
                    setProfileImage(response.data.avatar);
                    setUsername(response.data.username);
                    setAdmin(response.data.admin);
                }
                catch(error) {
                    console.log(error);
                }
            }
            getUserInfo();
        }
    }, [post.user]);

    const handlePostDelete = async () => {
        deleteFirebaseImage(post.image);
        
        if(!blog) {
            try {
                await axios.delete(baseURL + `/reviews/${user._id}/${post._id}`);
            }
            catch(error) {
                console.log(error);
            }
        }
        else {
            try {
                await axios.delete(baseURL + `/blogs/${user._id}/${post._id}`);
            }
            catch(error) {
                console.log(error);
            }
        }
        window.location.reload(false);
    }
    
    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={avatar} draggable='false'/>
                </div>
                {
                    user.admin === true ? 
                    (
                        admin === true ?
                        (
                            <text>{username}{displayAdminText}<span className='post-heading-trashcan' onClick={handlePostDelete}>{trashIcon}</span></text>

                        ) : 
                        (
                            <text>{username} <span className='post-heading-trashcan' onClick={handlePostDelete}>{trashIcon}</span></text>
                        )
                    ) : 
                    (
                        admin === true ?
                        (
                            <text>{username}{displayAdminText}</text>

                        ) : 
                        (
                            <text>{username}</text>
                        )
                    )
                }
            </div>
            {
                !blog ? 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={image} draggable='false'></img> 
                        </div>
                        <div className='post-info'>
                            <h1>{post.title}</h1>
                            <div className='post-info-rating'>{ratingDisplay}</div>
                            <a href={`review/${post._id}`}>Click here for more details</a>
                        </div>
                    </>
                ) : 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={image} draggable='false'></img> 
                        </div>
                        <div className='post-info'>
                            <h1>{post.title}</h1>
                            {
                                post.thumbs < 1 ? 
                                (
                                    ''
                                ) : 
                                (
                                    post.thumbs === 1 ? 
                                    (
                                        <p>{post.thumbs} like</p>
                                    ) : 
                                    (
                                        <p>{post.thumbs} likes</p>
                                    )
                                )
                            }
                            <a href={`blog/${post._id}`}>Click here for more details</a>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Post;