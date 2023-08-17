import React, { useState } from 'react';

import './Carousel.scss';

interface Props {
  images: string[]; 
  itemWidth: number; 
  frameSize: number; 
  step: number; 
  animationDuration: number;
  infinite: boolean; 
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 1,
  animationDuration = 300,
  infinite = false,
}) => {
  const [x, setX] = useState(0);
  const maxIndex = -(images.length - frameSize);

   // button "Next"
  const handleNext = () => {
    const currentIndex = Math.max(x - step, maxIndex);

    setX(infinite && currentIndex === maxIndex ? 0 : currentIndex);
  };

  // button "Prev"
  const handlePrev = () => {
    const currentIndex = Math.min(x + step, 0);

    setX(infinite && currentIndex === 0 ? maxIndex : currentIndex);
  };

  return (
    <div 
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(${x * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              width={itemWidth}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button 
        type="button"
        onClick={handlePrev}
        disabled={!infinite && x === 0}
      >
        Prev
      </button>

      <button type="button"
        onClick={handleNext}
        disabled={!infinite && x === maxIndex}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
