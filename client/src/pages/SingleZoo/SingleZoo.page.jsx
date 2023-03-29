import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const SingleZoo = () => {
    const { zooId } = useParams();
    console.log(zooId);

    const fetchZooById = useCallback(async () => {
        const id = zooId;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-zoo/${id}`);
                console.log(response.data);
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