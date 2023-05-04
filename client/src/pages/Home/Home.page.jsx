// React
import React, { useState, useEffect, useCallback } from 'react';

// CSS
import './Home.style.css';

// component
import Post from '../../components/Post/Post.component';
import Loader from '../../components/Loader/Loader.component';

// util
import { displayPosts } from './Home.util';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const Home = ({ user }) => {
    const [reviews, setReviews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [fetched, setFetched] = useState(false);
    
    let maxReviewsDisplayed = displayPosts(user.admin, reviews.length);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(baseURL + '/reviews');
            setReviews(response.data.reverse());
            setFetched(true);
        }
        catch(error) {
            console.log(error)
        }
    }, [setReviews]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await axios.get(baseURL + '/blogs');
            setBlogs(response.data.reverse());
            setFetched(true);
        }
        catch(error) {
            console.log(error)
        }
    }, [setBlogs]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    if(fetched === false) {
        return (
            <Loader/>
        );
    }

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