import React, { useState } from 'react';
import './Profile.css'

function Profile() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const profiles = [
        {
            image: 'https://clubcatt.com/cdn/shop/articles/domestic-cat-breeds.jpg?v=1689772643&width=533',
            description: (
                <>
                    Hi, I’m <strong>Chua Chi Jun</strong> 👋<br></br>
                </>
            )
        },
        {
            image: 'https://dinoanimals.com/wp-content/uploads/2023/03/Domestic-cat-33.jpg',
            description: (
                <>
                    I am developer who enjoys building things for the web and occasionally breaking them in the process.
                    I work mainly with HTML, CSS, and JavaScript, and I’m currently improving one bug at a time.
                    <br></br><br></br>
                    When I’m not coding, I’m probably Googling why my code isn’t working… or pretending I know exactly why it isn’t working.
                </>
            )
        }
    ]

    // Function to navigate left (prev)
    const goToPrev = () => {
        setCurrentIndex((oldIndex) => 
            oldIndex === 0 ? profiles.length - 1 : oldIndex - 1
        )
    };

    // Function to navigate right (next)
    const goToNext = () => {
        setCurrentIndex((oldIndex) => 
            oldIndex === profiles.length - 1 ? 0 : oldIndex + 1
        )
    }

    return (
        <div className='profile-container'>
            <div className='profile-content'>
                <h1>About</h1>
                <div className='carousel-container'>
                    <button onClick={goToPrev} className='carousel-btn prev'>
                        &#10094;
                    </button>
                    <div className='carousel-slide'>
                        <img 
                            src={profiles[currentIndex].image}
                            alt={`Image ${currentIndex + 1}`}
                            className='carousel-image fade-in'
                        />
                    </div>
                    <button onClick={goToNext} className='carousel-btn next'>
                        &#10095;
                    </button>
                </div>
                <div className='profile-description'>
                    {profiles[currentIndex].description}
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Profile;