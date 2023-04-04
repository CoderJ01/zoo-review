// React
import React, { useState, useEffect, useCallback }from 'react';

// CSS
import './PostReview.style.css';

// utils
import { ratings } from './PostReview.utils';

// URLs 
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const PostReview = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(ratings[0]);
    const [zoos, setZoos] = useState([]);
    const [zooNames, setZooNames] = useState([]);
    const [pickedZoo, setPickedZoo] = useState(zooNames[0]);
    const [zooId, setZooId] = useState('');
    
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

   const getZooId = useCallback(() => {
        zoos.filter(zoo => {
            if(pickedZoo === zoo.name) {
                setZooId(zoo._id)
            }
            return zoo.name;
        })
   }, [zoos, pickedZoo, setZooId]);

   useEffect(() => {
        getZooId();
   }, [getZooId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!title) {
            alert('A title is needed!');
            return;
        }

        if(content.length < 15) {
            alert('The review needs to be at least 15 characters!');
            return;
        }
        
        axios.post(baseURL + `/post-review/${user._id}/${zooId}`, 
            {
                title: title,
                content: content,
                rating: selected
            }
        )
        .then(
            response => {
                alert(response.data.msg);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }

    const handleContent = (e) => {
        setContent(e.target.value);
        setCount(e.target.value.length);
    }

    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <h1>Write a Review</h1>
            <div>
                <label htmlFor='zoo-name'>Zoo:</label><br/>
                <select 
                    value={pickedZoo} 
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
            {
                count === 0 ? 
                (
                    <>
                      <label htmlFor='content'>Content ({count}/1000):</label><br/>
                    </>
                ) : 
                (
                    count > 0 && count < 15 ? 
                    (
                        <>
                          <label htmlFor='content' style={{ color: 'rgb(223, 33, 33)' }}>Content ({count}/1000):</label><br/>
                        </>
                    ) : 
                    (
                        <>
                          <label htmlFor='content' style={{ color: 'rgb(34, 191, 41)' }}>Content ({count}/1000):</label><br/>
                        </>
                    )
                )
            }
                <textarea maxLength={1000} type='text' name='content' value={content} onChange={handleContent}/>
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