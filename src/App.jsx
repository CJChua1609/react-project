import { useState } from 'react';
import './App.css';

// components
import Header from './components/Header/Header';
import SnakeGame from './components/SnakeGame/SnakeGame';
import Profile from './components/AboutPage/Profile/Profile';
import Home from './components/HomePage/Home';
import Contact from './components/ContactPage/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [page, setPage] = useState('');
  return (
    <div className='app-container'>
      <Header setPage={setPage}/>
      {page === '' && <Home setPage={setPage} />}
      {page === 'about' && <Profile />}
      {page === 'snakeGame' && <SnakeGame />}
      {page === 'contact' && <Contact />}
      {page!= 'snakeGame' && <Footer />}
    </div>
  )
}

export default App