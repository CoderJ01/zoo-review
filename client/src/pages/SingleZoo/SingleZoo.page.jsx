import React from 'react';
import { useParams } from 'react-router';

const SingleZoo = () => {
    const { zooId } = useParams();
    console.log(zooId);
    return (
        <></>
    );
}

export default SingleZoo;