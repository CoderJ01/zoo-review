import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { displayRating } from '../../components/Post/Post.util';

const baseURL = 'http://localhost:3001';

const SingleReview = () => {
    const { reviewId } = useParams();
    const [ review, setReview ] = useState([]);
    const [ date, setDate ] = useState([]);

    let rating = displayRating(review.data.rating);

    useEffect(() => {
        const id = reviewId;

        if(id) {
            const fetchReviewById = async () => {
                try {
                    const response = await axios.get(baseURL + `/single-review/${id}`);
                    setReview(response.data);
                    setDate(response.data.data.updatedAt.substring());
                }
                catch(error) {
                    console.log(error);
                }
            }
            fetchReviewById();
        } 
    }, [reviewId]);

    console.log(review.data.updatedAt.toString().substring(0, 10));

    return (
        <div className='single-review'>
            <div className='single-review-display'>
                <h1>{review.data.title}</h1>
                <p>{review.data.content}</p>
                {rating}
                <p>{review.data.updatedAt.toString().substring(0, 10)}</p>
                <p>{review.zoo}</p>
                <p>{review.user}</p>
            </div>
        </div>
    );
}

export default SingleReview;