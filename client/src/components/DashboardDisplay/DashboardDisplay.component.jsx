import React from 'react';
import './DashboardDisplay.style.css'

const DashboardDisplay = ({ posts, display }) => {
    console.log(posts.length);
    return (
        <>
        {
            posts.length === 0 ? 
            (
                <div className='dashboard-zero-posts'>
                    <text>You currently have no posts</text>
                </div>
            ) : 
            (
                <div className='dashboard-posts'>
                {
                    posts.map(post => {
                        return (
                            <div className='dashboard-post'>
                                <img alt='' src=''/>
                                <h3><a href={`/your-post/${post.id}`}>{post.title}</a></h3>
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