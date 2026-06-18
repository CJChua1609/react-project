import React from 'react';
import './Home.css'
import Carousel from './Carousel';

const images = [
    {src: '../src/assets/mood1.gif', alt: 'mood 1'},
    {src: '../src/assets/mood2.gif', alt: 'mood 2'},
    {src: '../src/assets/mood3.gif', alt: 'mood 3'},
]

const NAV_ITEMS = [
  { key: '', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'snakeGame', label: 'Snake Game' },
];


function Home({setPage}) {
    return (
        <div className="home">
            <div className="hero">
                <Carousel images={images} interval={8000} />
                <nav className="home-nav" aria-label="Primary">
                    <button type="button" onClick={() => setPage('about')}>About</button>
                    <button type="button" onClick={() => setPage('snakeGame')}>Snake Game</button>
                    <button type="button" onClick={() => setPage('contact')}>Contact</button>
                </nav>
            </div>
        </div>
    );
}

export default Home;