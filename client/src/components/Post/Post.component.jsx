import React, { useState, useEffect, useCallback } from 'react';
import './Post.style.css'
import { displayRating, defaultProfileImage, blogImage } from './Post.util';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const Post = ({ id, user, avatar, image, title, post, rating, blog = false, zoo }) => {
    const [zooImage, setZooImage] = useState('');
    const [zooName, setZooName] =useState('');

    let ratingDisplay = displayRating(rating);

    useEffect(() => {
        const id = zoo;

        if(id) {
            const fetchZooImage = async () => {
                try {
                    const response = await axios.get(baseURL + `/api/zoos/${id}`);
                    setZooImage(response.data.image);
                    setZooName(response.data.name);
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchZooImage();
        }
    }, [zoo, setZooImage, setZooName])

    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={defaultProfileImage}/>
                </div>
                <div className='post-heading-info'>
                    <div className='post-username'>{user}</div>
                    {
                        !blog ? 
                        (
                            <text>Wrote a review</text>
                        ) : 
                        (
                            <text>Wrote a blog</text>
                        )
                    }
                </div>
            </div>
            <div className='post-picture'>
            {
                !blog ? 
                (
                    <img alt='' src={zooImage}></img>
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
                                <text>{zooName}: <a href={`review/${id}`} target="_blank" rel="noreferrer">{title}</a></text>
                            </h1>
                            <div className='post-info-rating'>
                                {ratingDisplay}
                            </div>
                        </>
                    ) : 
                    (
                        <>
                            <h1><a href={`blog-post/${id}`} target="_blank" rel="noreferrer">{title}</a></h1>
                            <div className='post-info-thumbs'>
                                <i class="fa fa-thumbs-up"></i>
                                <i class="fa fa-thumbs-down" style={{marginLeft: '1vw'}}></i>
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
    );
}

export default Post;