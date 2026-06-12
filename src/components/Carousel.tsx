import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const frameWidth = itemWidth * frameSize;
  const offset = currentIndex * itemWidth;

  const handleClickNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      if (nextIndex <= maxIndex) {
        return nextIndex;
      }

      return infinite ? 0 : maxIndex;
    });
  };

  const handleClickPrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - step;

      if (nextIndex >= 0) {
        return nextIndex;
      }

      return infinite ? maxIndex : 0;
    });
  };

  return (
    <div className="Carousel">
      <div className="Carousel__frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img
                className="Carousel__image"
                src={image}
                alt={index.toString()}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleClickPrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={handleClickNext}
        disabled={!infinite && currentIndex >= maxIndex}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
