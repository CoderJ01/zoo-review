import React from 'react';
import { useParams } from 'react-router';

const SingleZoo = () => {
    const { zooId } = useParams();
    console.log(zooId);
    return (
        <div className='single-zoo'>
            <h1>Name of Zoo</h1>
            <div className='single-zoo-photo'>
                <img alt='' src=''></img>
            </div>
            <h2>Reviews</h2>
            <div className='sz-list-of-reviews'>

            </div>
        </div>
    );
}

export default SingleZoo;