import React from 'react';
import Post from '../../components/Post/Post.component';
import './Home.style.css'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

let blogs = [];
axios.get(baseURL + '/homepage/blogs')
.then(
    response =>  {
        console.log(response.data.length)
        for(let i = 0; i < response.data.length; i++) {
            // blogs.push(response.data[i]);
            blogs[i] = response.data[i];
        }
    })
.catch(err => console.log(err));

console.log(blogs);

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
            {
                Array.apply(0, Array(3)).map(function(x, i) {
                    return (
                        <Post
                            username={'joesmith098'}
                            avatar={''}
                            image={''}
                            title={'zoo'}
                            post={'The quick brown fox jumped over the lazy dog'}
                            blog={true}
                        />
                    )
                })
            }
            </div>
        </div>
    );
}

export default Home;