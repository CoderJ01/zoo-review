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
            {
                !blog ? 
                (
                    <div className='post-info'>
                        <h1><a href={`review/${post._id}`} target='_blank' rel='noreferrer'>{[post.title]}</a></h1>
                        <div className='post-info-rating'>{ratingDisplay}</div>
                    </div>
                ) : 
                (
                    <div className='post-info'>
                        <h1><a href={`blog/${post._id}`} target='_blank' rel='noreferrer'>{[post.title]}</a></h1>
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
                    </div>
                )
            }
        </div>
    );
}

export default Post;