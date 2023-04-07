// React
import React, { useState } from 'react';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const Update = ({ user }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        axios.put(baseURL + `/update/${user._id}`, 
        {
            email: email,
        },  
        )
        .then(
            response => {
                console.log(response.data);
            }, 
            error => {
                alert(error);
            }
        );
    }
    return (
        <div className='update'>
            <form className='update-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label><br/>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </form>
        </div>
    );
}

export default Update;