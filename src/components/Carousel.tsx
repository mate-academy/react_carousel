import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize?: number;
  step?: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize = 3,
  step = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    setCurrentIndex(prev => {
      const next = prev + step;

      if (infinite) {
        return next > maxIndex ? 0 : next;
      }

      return next > maxIndex ? maxIndex : next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - step;

      if (infinite) {
        return next < 0 ? maxIndex : next;
      }

      return next < 0 ? 0 : next;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li key={image} style={{ width: `${itemWidth}px`, flexShrink: 0 }}>
              <img
                src={image}
                alt="carousel item"
                width={itemWidth}
                height={itemWidth}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
                data-cy="image"
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" onClick={handleNext} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
