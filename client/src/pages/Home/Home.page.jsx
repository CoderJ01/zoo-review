import React from 'react';
import Post from '../../components/Post/Post.component';
import { sampleData } from './Home.sampledata';
import './Home.style.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-reviews'>
                <Post
                    username={'joesmith098'}
                    avatar={sampleData[0]}
                    image={sampleData[1]}
                    zoo={'zoo'}
                    review={'The quick brown fox jumped over the lazy dog'}
                    rating={5}
                />
            </div>
        </div>
    );
}

export default Home;