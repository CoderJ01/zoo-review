import React from 'react';
import './DashboardDisplay.style.css'
import { blogImage } from '../Post/Post.util';

const DashboardDisplay = ({ posts, display, blog = false }) => {
    let show;

    if(display === true) {
        show = '';
    }
    else {
        show = 'none'
    }

    return (
        <>
        {
            posts.length === 0 ? 
            (
                <div className='dashboard-zero-posts' style={{ display: show }}>
                    {
                        !blog ? 
                        (
                            <text>You currently have no reviews</text>
                        ) : 
                        (
                            <text>You currently have no blogs</text>
                        )
                    }
                </div>
            ) : 
            (
                <div className='dashboard-posts' style={{ display: show }}>
                {
                    posts.map(post => {
                        return (
                            <div className='dashboard-post'>
                            {
                                !blog ? 
                                (
                                    <img alt='' src=''/>
                                ) : 
                                (
                                    <img alt='' src={blogImage}/>
                                ) 
                            }
                                <h3><a href={`/your-post/${post._id}`} target="_blank" rel="noreferrer">{post.title}</a></h3>
                            </div>
                        );
                    })
                }
                </div>
            )
        }
        </>
    );
}

export default DashboardDisplay;