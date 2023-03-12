import React from 'react';
import './Post.style.css'
import { displayRating } from './Post.util';

const Post = ({ username, avatar, image, title, post, rating, blog = false }) => {
    let ratingDisplay = displayRating(rating);
    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={avatar}/>
                </div>
                <div className='post-heading-info'>
                    <div className='post-username'>{username}</div>
                    <text>Wrote a review</text>
                </div>
            </div>
            <div className='post-picture'>
                <img alt='' src={image}></img>
            </div>
            <div className='post-info'>
                <h1>{title}</h1>
                {
                    !blog ? 
                    (
                        <>
                            <div className='post-info-rating'>
                                {ratingDisplay}
                            </div>
                            <text>
                                {post}
                            </text>
                        </>
                    ) : 
                    (
                        <>
                        <div className='post-info-thumbs'>
                            <i class="fa fa-thumbs-up"></i>
                            <i class="fa fa-thumbs-down" style={{marginLeft: '1vw'}}></i>
                            </div>
                        <text>
                            {post}
                        </text>
                        </>
                    )
                }
                
            </div>
        </div>
    );
}

export default Post;