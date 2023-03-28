import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { displayRating } from '../../components/Post/Post.util';
import './SingleReview.style.css';

const baseURL = 'http://localhost:3001';

const SingleReview = () => {
    const { reviewId } = useParams();
    const [ review, setReview ] = useState([]);

    const fetchReviewById = useCallback(async () => {
        const id = reviewId;
        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-review/${id}`);
                console.log(response.data)
                setReview(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [reviewId, setReview]);

    useEffect(() => {
        fetchReviewById();
    }, [fetchReviewById]);

    let rating = displayRating(review.data.rating);

    console.log(review.data);

    return (
        <div className='single-review'>
            <div className='single-review-display'>
                <div className='single-review-display-header'>
                    <h1>{review.data.title}</h1>
                    <p>{review.zoo}</p>
                </div>
                <div className='single-review-display-body'>
                    <p>{review.data.content}</p>
                    {rating}
                </div>
                <div className='single-review-display-footer'>
                    <p>{review.data.updatedAt.toString().substring(0, 10)}</p>
                    <p>{review.user}</p> 
                </div>
            </div>
        </div>
    );
}

export default SingleReview;

