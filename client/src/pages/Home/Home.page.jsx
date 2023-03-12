import React from 'react';
import './Home.style.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-reviews'>
                <div className='review'></div>
                <div className='review'></div>
                <div className='review'></div>
                <div className='review'></div>
                <div className='review'></div>
                <div className='review'></div>
            </div>
        </div>
    );
}

export default Home;