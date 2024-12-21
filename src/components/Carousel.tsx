import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const totalWidth = images.length * itemWidth;
  const maxPosition = -(totalWidth - frameSize * itemWidth);

  const handleNext = () => {
    setPosition(prev => {
      const newPosition = prev - step * itemWidth;

      if (newPosition < maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return newPosition;
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const newPosition = prev + step * itemWidth;

      if (newPosition > 0) {
        return infinite ? maxPosition : 0;
      }

      return newPosition;
    });
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <div className="Carousel__track-wrapper">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `transform ${animationDuration}ms`,
            width: `${totalWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image + index}
              style={{ width: `${itemWidth}px` }}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
