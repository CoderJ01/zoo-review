// React
import React, {useState, useEffect} from 'react';

// CSS
import './Home.style.css';

// component
import Post from '../../components/Post/Post.component';

// util
import { displayPosts } from './Home.util';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const Home = ({ user }) => {
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    
    let maxReviewsDisplayed = displayPosts(user.admin, reviews.length);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(baseURL + '/homepage/reviews');
                setReviews(response.data.reverse());
            }
            catch(error) {
                console.log(error)
            }
        }

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(baseURL + '/homepage/blogs');
                setBlogs(response.data.reverse());
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
            {
                reviews.length === 0 ? 
                (
                    ''
                ) : 
                (
                    <>
                        <h1>Zoo Reviews</h1>
                        <div className='home-posts'>
                        {
                            reviews.map((review, i = 0) => {
                                if(i < maxReviewsDisplayed) {
                                    return (
                                        <Post
                                            user={user}
                                            post={review}
                                        />
                                    );
                                }
                                else {
                                    return (<></>);
                                }
                            })
                        }
                        </div>
                    </>
                )
            }
            {
                blogs.length === 0 ? 
                (
                    ''
                ) : 
                (
                    <>
                        <h1>Blogs</h1>
                        <div className='home-posts'>
                        {
                            blogs.map((blog) => {
                                return (
                                    <Post
                                        user={user}
                                        post={blog}
                                        blog={true}
                                    />
                                );
                            })
                        }
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Home;