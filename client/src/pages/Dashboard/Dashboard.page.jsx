import React from 'react';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='dashboard-top-bar'>
                <h1>Your Dashboard</h1>
                <div className='dashboard-t-b-buttons'>
                    <button>See your reviews</button>
                    <button>See your blog posts</button>
                </div>
            </div>
            <div className='dashboard-bottom'>
                <div className='dashboard-b-user-info'>
                    <div className='dashboard-b-u-i-avatar'></div>
                    <div className='dashboard-b-u-i-bio'></div>
                </div>
                <div classname='dasboard-b-posts-display'>
                    <div className='dasboard-b-p-d-single-post'></div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;