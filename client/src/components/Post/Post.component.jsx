import React from 'react';
import './Post.style.css'
import { displayRating } from './Post.util';

const Post = ({ id, username, avatar, image, title, post, rating, blog = false }) => {
    id=1;
    let ratingDisplay = displayRating(rating);
    return (
        <div className='post'>
            <div className='post-heading'>
                <div className='post-heading-avatar'>
                    <img alt='' src={avatar}/>
                </div>
                <div className='post-heading-info'>
                    <div className='post-username'>{username}</div>
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
                <img alt='' src={image}></img>
            </div>
            <div className='post-info'>
                {
                    !blog ? 
                    (
                        <>
                            <h1><a href={`review/${id}`}>{title}</a></h1>
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
                         <h1><a href={`blog-post/${id}`}>{title}</a></h1>
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