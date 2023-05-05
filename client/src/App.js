// React
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// CSS
import './App.css';

// pages
import Home from './pages/Home/Home.page';
import Review from './pages/Review/Review.page';
import Blog from './pages/Blog/Blog.page';
import Dashboard from './pages/Dashboard/Dashboard.page';
import SingleReview from './pages/SingleReview/SingleReview.page';
import SingleBlog from './pages/SingleBlog/SingleBlog.page';
import SingleZoo from './pages/SingleZoo/SingleZoo.page';
import Update from './pages/Update/Update.page';

// component
import Header from './components/Header/Header.component';

// URL
import { baseURL } from './URLs/urls';

// other imports
import axios from 'axios';
import cookie from 'js-cookie';

function App() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		const fetchUser = async() => {
			try {
				let userCookie = cookie.get('zelp-cookie');
				const response = await axios.get(baseURL + '/users')
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
	}, []);

  return (
    <div className='App'>
    	<BrowserRouter>
			<Routes>
				<Route path='/' element={<Header user={user}/>}>
					<Route index element={<Home user={user}/>}/>
					<Route path='/write-review' element={<Review user={user}/>}/>
					<Route path='/post-blog' element={<Blog user={user}/>}/>
					<Route path='/dashboard' element={<Dashboard user={user}/>}/>
					<Route path='/review/:reviewId' element={<SingleReview/>}/>
					<Route path='/blog/:blogId' element={<SingleBlog loggedUser={user}/>}/>
					<Route path='/zoo/:zooId' element={<SingleZoo/>}/>
					<Route path='/update' element={<Update user={user}/>}/>
				</Route>
			</Routes>
    	</BrowserRouter>
    </div>
  );
}

export default App;
