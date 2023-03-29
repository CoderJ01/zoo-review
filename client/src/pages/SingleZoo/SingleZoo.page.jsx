// React
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

// CSS
import './SingleZoo.style.css';

// component
import ZooReview from '../../components/ZooReview/ZooReview.component';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const SingleZoo = () => {
    const { zooId } = useParams();

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    const fetchZooById = useCallback(async () => {
        const id = zooId;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-zoo/${id}`);
                setName(response.data.name);
                setImage(response.data.image);
                setReviews(response.data.reviews);
                setTotalReviews(response.data.reviews.length);

                let sumOfRatings = 0;
                for(let i = 0; i < response.data.reviews.length; i++) {
                    sumOfRatings += response.data.reviews[i].rating;
                }
                setTotalRatings(sumOfRatings);
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
                {
                    reviews.length === 0 ? 
                    (
                        ''
                    ) : 
                    (
                        <text>Average Rating: {totalRatings/totalReviews}</text>
                    )
                }
            </div>
            <h2>Reviews</h2>
            <div className='sz-list-of-reviews'>
            {
                reviews.length === 0 ? 
                (
                    <>
                        <br/>
                       <text>This zoo has yet to be reviewed!</text>
                    </>
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