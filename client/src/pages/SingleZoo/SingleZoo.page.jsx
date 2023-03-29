import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const SingleZoo = () => {
    const { zooId } = useParams();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [reviews, setReviews] = useState([]);

    const fetchZooById = useCallback(async () => {
        const id = zooId;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-zoo/${id}`);
                setName(response.data.name);
                setImage(response.data.image);
                setReviews(response.data.reviews);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [zooId]);

    useEffect(() => {
        fetchZooById();
    }, [fetchZooById]);

    console.log(name);
    console.log(image);
    console.log(reviews);

    return (
        <div className='single-zoo'>
            <h1>Name of Zoo</h1>
            <div className='single-zoo-photo'>
                <img alt='' src=''></img>
            </div>
            <text>Average rating: </text>
            <h2>Reviews</h2>
            <div className='sz-list-of-reviews'>

            </div>
        </div>
    );
}

export default SingleZoo;