import React from 'react';
import { useParams } from 'react-router-dom';

const SingleReview = () => {
    const { reviewId } = useParams();
    console.log(reviewId);
    return (
        <></>
    );
}

export default SingleReview;