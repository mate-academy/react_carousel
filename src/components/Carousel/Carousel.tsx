import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import { Direction } from '../../types/Direction';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [slideRange, setSlideRange] = useState([0, frameSize - 1]);

  useEffect(() => {
    setSlideRange([0, frameSize - 1]);
  }, [frameSize]);

  const handleSetSlideRange = (direction: Direction) => {
    setSlideRange(current => {
      let newSlide;

      let availableStep;

      switch (direction) {
        case Direction.Prev:
          if (slideRange[0] - step < 0) {
            availableStep = slideRange[0];
          } else {
            availableStep = step;
          }

          newSlide = [current[0] - availableStep, current[1] - availableStep];
          break;
        case Direction.Next:
          if (slideRange[1] + step > images.length - 1) {
            availableStep = images.length - 1 - slideRange[1];
          } else {
            availableStep = step;
          }

          newSlide = [current[0] + availableStep, current[1] + availableStep];
          break;
      }

      return newSlide;
    });
  };

  return (
    <div className="Container">
      <button
        type="button"
        disabled={slideRange[0] === 0}
        className="Carousel__button"
        onClick={() => handleSetSlideRange(Direction.Prev)}
      >
        {`<<`}
      </button>

      <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            transform: `translateX(${-slideRange[0] * itemWidth}px)`,
            width: `${frameSize * itemWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={`${index + 1}`}
                className="Carousel__img"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={slideRange[1] >= images.length - 1}
        className="Carousel__button"
        data-cy="next"
        onClick={() => handleSetSlideRange(Direction.Next)}
      >
        {`>>`}
      </button>
    </div>
  );
};
