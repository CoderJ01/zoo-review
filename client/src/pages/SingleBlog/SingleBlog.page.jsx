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
        <></>
    );
}

export default SingleBlog;