import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const SingleBlog = () => {
    const { blogId } = useParams();

    const fetchBlogById = useCallback(async () => {
        const id = blogId;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-blog/${id}`);
                console.log(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [blogId]);

    useEffect(() => {
        fetchBlogById();
    }, [fetchBlogById]);

    return (
        <div className='single-blog'>
            <div className='single-blog-display'>
                <div className='single-blog-display-header'>
                    <h1>Title</h1>
                    <h2>by username</h2>
                </div>
                <div className='single-blog-display-body'>
                    <p>content</p>
                </div>
                <div className='single-blog-display-footer'>
                    <div className='sbdf-static-info'>
                        <p>date</p>
                        <p>email</p>
                    </div>
                    <p>likes</p>
                </div>
            </div>
        </div>
    );
}

export default SingleBlog;