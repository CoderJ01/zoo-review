// React
import React, { useState, useEffect } from 'react';

// CSS
import './Post.style.css';

// util
import { displayImage, trashIcon } from './Post.util';
import { displayAvatar, displayRating } from '../../utils/display';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const Post = ({ user, post, blog = false }) => {
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');

    let ratingDisplay = displayRating(post.rating);
    let avatar = displayAvatar(profileImage);
    let image = displayImage(blog, post);

    useEffect(() => {
        const id = post.user;

        if(id) {
            const getUserInfo = async () => {
                try {
                    const response = await axios.get(baseURL + `/api/users/${id}`);
                    setProfileImage(response.data.avatar);
                    setUsername(response.data.username);
                }
                catch(error) {
                    console.log(error);
                }
            }
            getUserInfo();
        }
    }, [post.user]);

    const handlePostDelete = async () => {
        if(!blog) {
            try {
                let response = await axios.delete(baseURL + `/homepage/review/${user._id}/${post._id}`);
                console.log(response);
            }
            catch(error) {
                console.log(error);
            }
        }
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
                        <text>{username} <span className='post-heading-trashcan' onClick={handlePostDelete}>{trashIcon}</span></text>
                    ) : 
                    (
                        <text>{username}</text>
                    )
                }
            </div>
            {
                !blog ? 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={image}></img> 
                        </div>
                        <div className='post-info'>
                            <h1>{post.title}</h1>
                            <div className='post-info-rating'>{ratingDisplay}</div>
                            <a href={`review/${post._id}`} target='_blank' rel='noreferrer'>Click here for more details</a>
                        </div>
                    </>
                ) : 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={image}></img> 
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
                            <a href={`blog/${post._id}`} target='_blank' rel='noreferrer'>Click here for more details</a>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Post;