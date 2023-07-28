import React, { useState } from 'react';
import './Carousel.scss';
import { getAlt } from '../utils';
import { PopUp } from './PopUp/PopUp';

type Props = {
  photos: string[];
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  step: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  photos,
  itemWidth,
  animationDuration,
  frameSize,
  step,
  infinite,
}) => {
  const [translateValue, setTranslateValue] = useState(0);

  const handleNextPic = () => {
    setTranslateValue(prev => {
      const nextValue = prev - (itemWidth * step);
      const minValue = -(itemWidth * photos.length - 1);

      return nextValue > 0 || nextValue < minValue ? prev : nextValue;
    });
  };

  const handlePrevPic = () => {
    setTranslateValue(prev => {
      const nextValue = prev + (itemWidth * step);

      return nextValue > 0 ? prev : nextValue;
    });
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        transition: `${animationDuration}ms ease`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {photos.map(image => (
          <li
            key={getAlt(image)}
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={String(getAlt(image))}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevPic}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNextPic}
        >
          Next
        </button>
      </div>

      {infinite && <PopUp />}
    </div>
  );
};

export default Carousel;
