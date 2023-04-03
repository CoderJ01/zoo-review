// React
import React from 'react';

// CSS
import './Post.style.css'

// util
import { displayRating, defaultProfileImage, blogImage, reviewImage } from './Post.util';

const Post = ({ post, blog = false }) => {

    let ratingDisplay;

    if(post.rating) {
        ratingDisplay = displayRating(post.rating);
    }
    else {
        ratingDisplay = '';
    }

    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={defaultProfileImage}/>
                </div>
            </div>
            {
                !blog ? 
                (
                    <>
                        <div className='post-picture'>
                            <img alt='' src={reviewImage}></img> 
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
                            <img alt='' src={blogImage}></img> 
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