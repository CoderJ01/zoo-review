import React from 'react';
import './Dashboard.style.css'

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='dashboard-top-bar'>
                <h1>Your Dashboard</h1>
            </div>
            <div className='dashboard-bottom'>
                <div className='dashboard-b-user-info'>
                    <h2>Your Avatar</h2>
                    <div className='dashboard-b-u-i-avatar'>
                        <img alt='' src=''/>
                    </div>
                    <h2 style={{ marginTop: '7%'}}>Your Bio</h2>
                    <div className='dashboard-b-u-i-bio'>
                        <text>The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.</text>
                    </div>
                </div>
                <div className='dashboard-b-buttons'>
                    <button>See your reviews</button>
                    <button>See your blog posts</button>
                </div>
                <div className='dashboard-b-posts-display'>
                    <div className='dashboard-b-p-d-flex'>
                        <div className='d-b-p-d-f-single-post'>
                            <img alt='' src=''/>
                            <h3>Title</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;