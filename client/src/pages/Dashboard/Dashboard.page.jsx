import React from 'react';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='dashboard-top-bar'>
                <h1>Your Dashboard</h1>
                <div className='dashboard-top-bar-buttons'>
                    <button>See your reviews</button>
                    <button>See your blog posts</button>
                </div>
            </div>
            <div className='dashboard-bottom'>
                <div className='dashboard-bottom-user-info'>
                    <div className='dashboard-bottom-user-info-avatar'></div>
                    <div className='dashboard-bottom-user-info-bio'></div>
                </div>
                <div classname='dasboard-bottom-posts-display'>
                    <div className='dasboard-bottom-posts-display-single-post'></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;