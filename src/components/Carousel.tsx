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
  const [position, setPosition] = useState<number>(0);

  const maxPosition = images.length - frameSize;

  const handleNext = () => {
    setPosition(prev => {
      const next = prev + step;

      if (next > maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return next;
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      const next = prev - step;

      if (next < 0) {
        return infinite ? maxPosition : 0;
      }

      return next;
    });
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && position === 0}
      >
        Prev
      </button>

      <div
        className="Carousel__viewport"
        style={{ width: itemWidth * frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((img, index) => (
            <li
              key={`${img}-${index}`}
              className="Carousel__item"
              style={{ width: itemWidth }}
            >
              <img src={img} alt={`Slide ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={!infinite && position >= maxPosition}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
