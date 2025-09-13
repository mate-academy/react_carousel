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
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    if (infinite) {
      setIndex(prev => (prev + step > maxIndex ? 0 : prev + step));
    } else {
      setIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setIndex(prev => (prev - step < 0 ? maxIndex : prev - step));
    } else {
      setIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${index * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((image, i) => (
          <li key={i}>
            <img
              src={image}
              alt={`Image ${i + 1}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        data-cy="prev"
        className="Carousel__button Carousel__button--prev"
        disabled={!infinite && index <= 0}
        aria-disabled={!infinite && index <= 0}
        type="button"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        className="Carousel__button Carousel__button--next"
        disabled={!infinite && index >= maxIndex}
        aria-disabled={!infinite && index >= maxIndex}
        type="button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
