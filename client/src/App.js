import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home/Home.page';
import Header from './components/Header/Header.component';
import Review from './pages/Review/Review.page';
import Blog from './pages/Blog/Blog.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import SingleReview from './pages/SingleReview/SingleReview.page';
import SingleBlog from './pages/SingleBlog/SingleBlog.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import cookie from 'js-cookie';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        let userCookie = cookie.get('zelp-cookie');
        const response = await axios.get(baseURL + '/api/users')
        for(let i = 0; i < response.data.length; i++) {
            if(response.data[i].randomString === userCookie) {
              setUser(response.data[i]);
            }
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchUser();
  }
  , []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header user={user}/>}>
            <Route index element={<Home/>}/>
            <Route path='/write-review' element={<Review user={user}/>}/>
            <Route path='/post-blog' element={<Blog user={user}/>}/>
            <Route path='/dashboard' element={<Dashboard user={user}/>}/>
            <Route path='/review/:reviewId' element={<SingleReview/>}/>
            <Route path='/blog/:blogId' element={<SingleBlog/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
