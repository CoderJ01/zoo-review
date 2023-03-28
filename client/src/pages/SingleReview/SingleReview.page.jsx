import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const SingleReview = () => {
    const { reviewId } = useParams();

    useEffect(() => {
        const id = reviewId;

        if(id) {
            const fetchReviewById = async () => {
                try {
                    const response = await axios.get(baseURL + `/single-review/${id}`);
                    console.log(response.data);
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchReviewById();
        } 
    }, [reviewId]);

    return (
        <></>
    );
}

export default SingleReview;