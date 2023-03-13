import './App.css';
import Home from './pages/Home/Home.page';
import Header from './components/Header/Header.component';
import Review from './pages/Review/Review.page';
import Blog from './pages/Blog/Blog.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header/>}>
            <Route index element={<Home/>}/>
            <Route path='/write-review' element={<Review/>}/>
            <Route path='/post-blog' element={<Blog/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
