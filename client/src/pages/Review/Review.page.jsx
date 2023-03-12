import React from 'react';

const Review = () => {
    return (
        <div className='review'>
            <h1>Write Your Review</h1>
            <form>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label htmlFor='content'>Content:</label><br/>
                    <input type="text" name="content" />
                </div>
            </form>
        </div>
    );
}

export default Review;