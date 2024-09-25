
import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 1,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = infinite
      ? (currentIndex + step) % images.length
      : Math.min(currentIndex + step, images.length - frameSize);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = infinite
      ? (currentIndex - step + images.length) % images.length
      : Math.max(currentIndex - step, 0);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: `${frameSize * itemWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} className="Carousel__item" style={{ width: `${itemWidth}px` }}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <button data-cy="prev" type="button" onClick={handlePrev}>Prev</button>
      <button data-cy="next" type="button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;
