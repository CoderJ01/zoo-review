// React
import React from 'react';

// CSS
import './DashboardDisplay.style.css';

// utils
import { displayPosts, reversePostOrder, displayImage } from './DashboardDisplay.util';

const DashboardDisplay = ({ posts, display, blog = false }) => {
    
    let show = displayPosts(display);
    let reversedPosts = reversePostOrder(posts);

    return (
        <>
        {
            reversedPosts.length === 0 ? 
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
                    reversedPosts.map(post => {
                        let image = displayImage(post.image, blog);
                        return (
                            <div className='dashboard-post'>
                            {
                                !blog ? 
                                (
                                    <>
                                        <a href={`/review/${post._id}`} target='_blank' rel='noreferrer'>
                                            <img alt='' src={image}/>
                                        </a>
                                        <h3>{post.title}</h3>
                                    </>
                                ) : 
                                (   
                                    <>
                                        <a href={`/blog/${post._id}`} target='_blank' rel='noreferrer'>
                                            <img alt='' src={image}/>
                                        </a>
                                        <h3>{post.title}</h3>
                                    </>
                                ) 
                            }
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