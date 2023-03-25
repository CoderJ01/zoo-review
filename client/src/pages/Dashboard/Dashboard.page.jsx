import React from 'react';
import './Dashboard.style.css'
import AccessDenied from '../../components/AccessDenied/AcessDenied';

const Dashboard = ({ user }) => {
    return (
        <>
        {
            user.length === 0 ? 
            (
                <AccessDenied/>
            ) : 
            (
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
                                <text>{user.bio}</text>
                            </div>
                        </div>
                        <div className='dashboard-b-buttons'>
                            <button>See your reviews</button>
                            <button>See your blog posts</button>
                        </div>
                        <div className='dashboard-b-posts-display'>
                            <div className='d-b-p-d-f-single-post'>
                                <img alt='' src=''/>
                                {/* <h3><a href={`/your-post/${id}`}>{currentUser.reviews[0].title}</a></h3> */}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default Dashboard;