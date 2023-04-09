// React
import React, { useState } from 'react';

// CSS
import './Dashboard.style.css';

// components
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';
import DashboardDisplay from '../../components/DashboardDisplay/DashboardDisplay.component';

// utils
import { displayAvatar } from '../../utils/display';

// URL
import { baseURL_frontend } from '../../URLs/urls';

// other imports
import Button from 'react-bootstrap/esm/Button';

const buttonStyle = {
    backgroundColor: 'white', 
    border: '1px solid white',
    borderRadius: '10px',
    color: 'rgb(29, 146, 34)',
    height: '100%', 
    width: '100%' 
}

const Dashboard = ({ user }) => {
    const [displayReviews, setDisplayReviews] = useState(true);
    const [displayBlogs, setDisplayBlogs] = useState(false);

    let avatar = displayAvatar(user.avatar);

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
                        <div className='dashboard-bottom-user-info'>
                            <h2>Your Avatar</h2>
                            <div className='dbui-avatar'>
                                <img alt='' src={avatar} draggable='false'/>
                            </div>
                            <h2 style={{ marginTop: '7%'}}>Your Bio</h2>
                            <div className='dbui-bio'>
                                <text>{user.bio}</text>
                            </div>
                        </div>
                        <div className='dashboard-bottom-buttons'>
                            <button onClick={seeReviews}>
                                See your reviews
                            </button>
                            <button onClick={seeBlogs}>
                                See your blog posts
                            </button>
                        </div>
                        <DashboardDisplay posts={user.reviews} display={displayReviews}/>
                        <DashboardDisplay posts={user.blogs} display={displayBlogs} blog={true}/>
                        <div className='dashboard-update-button'>
                            <Button href={baseURL_frontend + '/update'} style={buttonStyle}>Update Info</Button>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default Dashboard;