import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const maxIndex = images.length - frameSize;

    if (currentIndex + step <= images.length - frameSize) {
      setCurrentIndex(Math.min(currentIndex + step, maxIndex));
    } else if (infinite === true) {
      setCurrentIndex(0);
    }

    return;
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(currentIndex - step, 0));
    } else if (infinite === true) {
      setCurrentIndex(images.length - frameSize);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          display: 'flex',
          width: `${itemWidth * frameSize}px`,
          padding: 0,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => {
          return (
            <li
              style={{ width: `${itemWidth}`, listStyle: 'none' }}
              key={index + 1}
            >
              <img
                src={image}
                alt={String(index + 1)}
                data-cy="carousel-img"
                width={itemWidth}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        data-cy="prev"
        disabled={!infinite && currentIndex < 0}
        onClick={() => {
          handlePrev();
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        disabled={!infinite && currentIndex >= images.length - frameSize - 1}
        onClick={() => {
          handleNext();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
