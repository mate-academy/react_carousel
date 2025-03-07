import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + step;
      if (newIndex >= images.length) {
        return infinite ? 0 : prevIndex;
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - step;
      if (newIndex < 0) {
        return infinite ? images.length - frameSize : prevIndex;
      }
      return newIndex;
    });
  };

  const containerStyle = {
    width: `${itemWidth * frameSize}px`,
    overflow: 'hidden',
  };

  const listStyle = {
    display: 'flex',
    transition: `transform ${animationDuration}ms ease`,
    transform: `translateX(-${currentIndex * itemWidth}px)`,
  };

  return (
    <div className="Carousel">
      <h1 data-cy="title">Carousel</h1>
      <div style={containerStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li key={index} style={{ width: `${itemWidth}px` }}>
              <img src={image} alt={`Image ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={handlePrev} data-cy="prev">Prev</button>
      <button type="button" onClick={handleNext} data-cy="next">Next</button>
    </div>
  );
};

export default Carousel;
