import React, { useState } from 'react';
import './Dashboard.style.css'
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';
import DashboardDisplay from '../../components/DashboardDisplay/DashboardDisplay.component';

const Dashboard = ({ user }) => {
    const [displayReviews, setDisplayReviews] = useState(true);
    const [displayBlogs, setDisplayBlogs] = useState(false);

    const seeReviews = () => {
        setDisplayReviews(true);
        setDisplayBlogs(false);
    }

    const seeBlogs = () => {
        setDisplayReviews(false);
        setDisplayBlogs(true);
    }

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
                            <button onClick={seeReviews}>
                                See your reviews
                            </button>
                            <button onClick={seeBlogs}>
                                See your blog posts
                            </button>
                        </div>
                        <DashboardDisplay posts={user.reviews} display={displayReviews}/>
                        <DashboardDisplay posts={user.blogs} display={displayBlogs} blog={true}/>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default Dashboard;