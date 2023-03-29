import React, {useState, useEffect} from 'react';
import Post from '../../components/Post/Post.component';
import './Home.style.css'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(baseURL + '/homepage/reviews');
                setReviews(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(baseURL + '/homepage/blogs');
                setBlogs(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        fetchReviews();
        fetchBlogs();

    }, []);

    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-posts'>
            {
                reviews.length === 0 ? 
                (
                    ''
                ) : 
                (
                    reviews.map(review => {
                        return (
                            <Post
                               post={review}
                            />
                        );
                    })
                )
            }
            </div>
            <h1>Blogs</h1>
            <div className='home-posts'>
            {
                blogs.length === 0 ? 
                (
                    ''
                ) :
                (
                    blogs.map(blog => {
                        return (
                            <Post
                                post={blog}
                                blog={true}
                            />
                        );
                    })
                )
            }
            </div>
        </div>
    );
}

export default Home;