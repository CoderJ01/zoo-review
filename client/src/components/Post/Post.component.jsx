import React, { useState, useEffect} from 'react';
import './Post.style.css'
import { displayRating, defaultProfileImage, blogImage, reviewImage } from './Post.util';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const Post = ({ post, blog = false }) => {
    const [zooName, setZooName] =useState('');

    let ratingDisplay
    if(post.rating) {
        ratingDisplay = displayRating(post.rating);
    }
    else {
        ratingDisplay = '';
    }

    useEffect(() => {
        const id = post.zoo;

        if(id) {
            const fetchZooImage = async () => {
                try {
                    const response = await axios.get(baseURL + `/api/zoos/${id}`);
                    setZooName(response.data.name);
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchZooImage();
        }
    }, [post.zoo])

    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={defaultProfileImage}/>
                </div>
            </div>
            <div className='post-picture'>
            {
                !blog ? 
                (
                    <img alt='' src={reviewImage}></img>
                ) : 
                (
                    <img alt='' src={blogImage}></img>
                )
            }
            </div>
            <div className='post-info'>
                {
                    !blog ? 
                    (
                        <>
                            <h1>
                                <text>{zooName}: <a href={`review/${post._id}`} target='_blank' rel='noreferrer'>{[post.title]}</a></text>
                            </h1>
                            <div className='post-info-rating'>
                                {ratingDisplay}
                            </div>
                        </>
                    ) : 
                    (
                        <>
                            <h1><a href={`blog/${post._id}`} target='_blank' rel='noreferrer'>{post.title}</a></h1>
                            <p>{post.thumbs} likes</p>
                        </>
                    )
                }
                
            </div>
        </div>
    );
}

export default Post;