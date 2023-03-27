import React, {useState, useEffect} from 'react';
import Post from '../../components/Post/Post.component';
import './Home.style.css'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState('')

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

    const fetchUserById = async (id) => {
        try {
            const response = await axios.get(baseURL + `/api/users/${id}`);
            setUser(response.data.username);
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='home'>
            <div className='home-top-image'/>
            <h1>Zoo Reviews</h1>
            <div className='home-posts'>
            {
                reviews.map(review => {
                    fetchUserById(review.user);
                    return (
                        <Post
                            id={review._id}
                            user={user}
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
                    fetchUserById(blog.user);
                    return (
                        <Post
                            id={blog._id}
                            user={user}
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