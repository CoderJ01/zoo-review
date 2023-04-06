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
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';

const PostReview = ({ user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [count, setCount] = useState(0);
    const [selected, setSelected] = useState(ratings[0]);
    const [zoos, setZoos] = useState([]);
    const [zooNames, setZooNames] = useState([]);
    const [pickedZoo, setPickedZoo] = useState(zooNames[0]);
    const [zooId, setZooId] = useState(process.env.REACT_APP_DEFAULT_ZOO_ID);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    
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

    const uploadImage = (e) => {
        setImageUpload(e.target.files[0]);
        alert('The image has been uploaded! Confirm the upload, then wait a few seconds to submit the review!');
    }

    const confirmUpload = () => {

        if(imageUpload != null) {
            setConfirmed(true);
            const imageRef = ref(storage, `images/reviews/${imageUpload.name + v4()}`);

            uploadBytes(imageRef, imageUpload)
            .then(() => {
                alert('Image confirmed! Wait a few seconds for it to process!');
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            alert('You have not uploaded an image!');
            window.location.reload(false);
            return;
        }

        listAll(imageListRef)
        .then(response => {
            response.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setImageUrl(url);
                });
            })
        });
    }

    const imageListRef = ref(storage, 'images/reviews/');

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

        if(imageUpload != null && confirmed === false) {
            alert('The upload needs to be confirmed so that image will process successfully!');
            return;
        }
        
        axios.post(baseURL + `/post-review/${user._id}/${zooId}`, 
            {
                title: title,
                content: content,
                rating: selected,
                image: imageUrl
            }
        )
        .then(
            response => {
                alert(response.data.msg);
                // window.location.reload(false);
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
                          <label htmlFor='content'>Content (<span style={{ color: 'rgb(223, 33, 33)' }}>{count}/1000</span>):</label><br/>
                        </>
                    ) : 
                    (
                        <>
                          <label htmlFor='content'>Content (<span style={{ color: 'rgb(34, 191, 41)' }}>{count}/1000</span>):</label><br/>
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
            <div className='pf-upload-image'>
                <input 
                    type='file'
                    onChange={uploadImage} 
                />
            </div>
            <div className='pf-confirm-upload'>
                <label htmlFor='radio'>Confirm image</label><br/>
                <input type='radio' name='radio' onChange={confirmUpload}/>
            </div>
            <button type='submit'>+ New Review</button>
        </form>
    );
}

export default PostReview;