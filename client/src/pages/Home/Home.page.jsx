import React from 'react';
import Post from '../../components/Post/Post.component';
import { sampleData } from './Home.sampledata';
import './Home.style.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-posts'>
                <Post
                    username={'joesmith098'}
                    avatar={sampleData[0]}
                    image={sampleData[1]}
                    title={'zoo'}
                    post={'The quick brown fox jumped over the lazy dog'}
                    rating={5}
                />
            </div>
            <h1>Blogs</h1>
            <div className='home-posts'>
                <Post
                    username={'joesmith098'}
                    avatar={sampleData[0]}
                    image={sampleData[1]}
                    title={'zoo'}
                    post={'The quick brown fox jumped over the lazy dog'}
                    rating={5}
                    blog={true}
                />
            </div>
            <h1>Categories</h1>
            <div className='home-posts'>
                
            </div>
        </div>
    );
}

export default Home;