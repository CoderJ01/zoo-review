import React from 'react';
import Review from '../../components/Review/Review.component';
import './Home.style.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-reviews'>
                <Review/>
                <Review/>
            </div>
        </div>
    );
}

export default Home;