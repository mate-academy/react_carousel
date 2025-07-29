import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(images.length - frameSize, 0);

  const scrollPrev = () => {
    if (!infinite) {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    } else if (maxIndex > 0) {
      setCurrentIndex(prev => (images.length + prev - step) % (maxIndex + 1));
    }
  };

  const scrollNext = () => {
    if (!infinite) {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    } else if (maxIndex > 0) {
      setCurrentIndex(prev => (prev + step) % (maxIndex + 1));
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${images.length * itemWidth}px`,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              className="Carousel__image"
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
                visibility: 'visible',
              }}
              src={image}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={scrollPrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
