import React, { useState, useEffect } from 'react';
import './Carousel.css';

function Carousel({ images, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);

  }, [images.length, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="carousel">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`carousel__slide ${i === index ? 'is-active' : ''}`}
        />
      ))}
    </div>
  );
}

export default Carousel;