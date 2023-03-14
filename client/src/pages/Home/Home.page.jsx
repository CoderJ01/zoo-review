import React from 'react';
import Post from '../../components/Post/Post.component';
import './Home.style.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-posts'>
                <Post
                    username={'joesmith098'}
                    avatar={''}
                    image={''}
                    title={'zoo'}
                    post={'The quick brown fox jumped over the lazy dog'}
                    rating={5}
                />
            </div>
            <h1>Blogs</h1>
            <div className='home-posts'>
                <Post
                    username={'joesmith098'}
                    avatar={''}
                    image={''}
                    title={'zoo'}
                    post={'The quick brown fox jumped over the lazy dog'}
                    blog={true}
                />
            </div>
        </div>
    );
}

export default Home;