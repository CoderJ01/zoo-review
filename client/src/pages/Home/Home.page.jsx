import React from 'react';
import Post from '../../components/Post/Post.component';
import './Home.style.css'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

let reviews = [];
axios.get(baseURL + '/homepage/reviews')
.then(
    response =>  {
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
            reviews[i] = response.data[i];
        }
    })
.catch(err => console.log(err));

let blogs = [];
axios.get(baseURL + '/homepage/blogs')
.then(
    response =>  {
        for(let i = 0; i < response.data.length; i++) {
            blogs[i] = response.data[i];
        }
    })
.catch(err => console.log(err));

const Home = () => {

    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-posts'>
            {
                reviews.map(review => {
                    return (
                        <Post
                            id={review._id}
                            user={review.user}
                            avatar={review.avatar}
                            image={review.image}
                            title={review.title}
                            rating={review.rating}
                            post={review.content}
                        />
                    );
                })
            }
            </div>
            <h1>Blogs</h1>
            <div className='home-posts'>
            {
                blogs.map(blog => {
                    return (
                        <Post
                            id={blog._id}
                            user={blog.user}
                            avatar={blog.avatar}
                            image={blog.image}
                            title={blog.title}
                            post={blog.post}
                            blog={true}
                        />
                    );
                })
            }
            </div>
        </div>
    );
}

export default Home;