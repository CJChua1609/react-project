import React from 'react';
import './Home.css'
import Carousel from './Carousel';

import mood1 from "../../assets/mood1.gif";
import mood2 from "../../assets/mood2.gif";
import mood3 from "../../assets/mood3.gif";

const images = [
    {src: mood1, alt: 'mood 1'},
    {src: mood2, alt: 'mood 2'},
    {src: mood3, alt: 'mood 3'},
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