import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './SingleZoo.style.css';
import ZooReview from '../../components/ZooReview/ZooReview.component';

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

    return (
        <div className='single-zoo'>
            <h1>{name}</h1>
            <div className='single-zoo-photo'>
                <img alt='' src={image}></img>
                <text>Average rating: </text>
            </div>
            <h2>Reviews</h2>
            <div className='sz-list-of-reviews'>
            {
                reviews.length === 0 ? 
                (
                    <text>This zoo has yet to be reviewed!</text>
                ) : 
                (
                    reviews.map(review => {
                        return (
                            <ZooReview review={review}/>
                        );
                    })
                )
            }
            </div>
        </div>
    );
}

export default SingleZoo;