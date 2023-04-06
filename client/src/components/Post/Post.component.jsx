// React
import React from 'react';

// CSS
import './Post.style.css'

// util
import { displayRating } from './Post.util';
import { defaultProfileImage, blogImage, reviewImage } from '../../utils/images';

const Post = ({ post, blog = false }) => {

    let ratingDisplay;

    if(post.rating) {
        ratingDisplay = displayRating(post.rating);
    }
    else {
        ratingDisplay = '';
    }

    if(!blog && post.image === '') {
        post.image = reviewImage;
    }

    if(blog && post.image === '') {
        post.image = blogImage;
    }

    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={defaultProfileImage} draggable='false'/>
                </div>
            </div>
            {
                !blog ? 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={post.image}></img> 
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
                            <img alt='' src={post.image}></img> 
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