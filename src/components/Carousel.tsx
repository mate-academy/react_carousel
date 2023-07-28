import React, { useState } from 'react';
import './Carousel.scss';

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

  const maxTranslate = photos.length * itemWidth - (frameSize * itemWidth);

  const handleNextPic = () => {
    const newTranslateValue = translateValue - itemWidth * step;

    if (infinite) {
      setTranslateValue(() => {
        return newTranslateValue <= -maxTranslate ? 0 : newTranslateValue;
      });
    } else {
      setTranslateValue(() => Math.max(newTranslateValue, -maxTranslate));
    }
  };

  const handlePrevPic = () => {
    const newTranslateValue = translateValue + itemWidth * step;

    if (infinite) {
      setTranslateValue(() => {
        return newTranslateValue > 0 ? -maxTranslate : newTranslateValue;
      });
    } else {
      setTranslateValue(() => Math.min(newTranslateValue, 0));
    }
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
            key={image}
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
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
    </div>
  );
};

export default Carousel;
