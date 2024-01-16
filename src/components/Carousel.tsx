import React, { useState } from 'react';
import './Carousel.scss';
import type { Image } from '../App';

type Props = {
  images: Image[];
  itemsWidth: number;
  frameSize: number;
  steps: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  itemsWidth,
  frameSize,
  steps,
}) => {
  const [position, setPosition] = useState(0);

  const min = 0;
  const max = images.length - frameSize;

  const handleNextStep = () => {
    if (position + steps < max) {
      setPosition(position + steps);
    } else {
      setPosition(max);
    }
  };

  const handlePrevStep = () => {
    if (position - steps > min) {
      setPosition(position - steps);
    } else {
      setPosition(min);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${itemsWidth * frameSize}px` }}
      >
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{
                width: `${itemsWidth}px`,
                transform: `translateX(${-position * itemsWidth}px)`,
              }}
            />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevStep}
          // disabled={position * itemsWidth === min}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          onClick={handleNextStep}
          // disabled={position * itemsWidth === max}
        >
          Next
        </button>
      </div>
    </div>
  );
};
