import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ratings } from './PostReview.utils';
import './PostReview.style.css'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const PostReview = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selected, setSelected] = useState(ratings[0]);
    const [zoos, setZoos] = useState([]);
    const [zooNames, setZooNames] = useState([]);
    const [pickedZoo, setPickedZoo] = useState(zooNames[1]);
    
    useEffect(() => { 
        const fetchZoos = async () => {
            try {
                const response = await axios.get(baseURL + '/api/zoos');
                setZoos(response.data);
            }   
            catch(error) {
                console.log(error)
            }
        }
        fetchZoos();
    }, []);

    const retrieveNames = useCallback(() => {
        let names = [];
        zoos.filter(zoo => {
            names.push(zoo.name);
            return zoo.name;
        });
        setZooNames(names);
    },[zoos, setZooNames]);

   useEffect(() => { 
        retrieveNames();
   }, [retrieveNames]);

    console.log(zooNames);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <h1>Write a Review</h1>
            <div>
                <label htmlFor='zoo-name'>Zoo:</label><br/>
                <select 
                    value={selected} 
                    onChange={e => setPickedZoo(e.target.value)}
                >
                    {zooNames.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='title'>Title:</label><br/>
                <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='content'>Content:</label><br/>
                <textarea maxLength={1000} type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='rating'>Rating:</label><br/>
                <select 
                    value={selected} 
                    onChange={e => setSelected(e.target.value)}
                >
                    {ratings.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
                </select>
            </div>
            <button type='submit'>+ New Review</button>
        </form>
    );
}

export default PostReview;