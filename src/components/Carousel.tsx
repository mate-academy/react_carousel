import React, { useState } from 'react';
import './Carousel.scss';
import arrow from './../img/arrow-black.svg';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const gap = 20;

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const frameWidth = (itemWidth + gap) * frameSize - gap;
  const listWidth = (itemWidth + gap) * images.length - gap;
  const maxTranslateValue = -(listWidth - frameWidth);

  const getStepWidth = (stepValue: number): number => {
    return (itemWidth + gap) * stepValue;
  };

  const [translateValue, setTranslateValue] = useState(0);

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={() =>
          setTranslateValue(
            translateValue + getStepWidth(step) <= 0
              ? translateValue + getStepWidth(step)
              : 0,
          )
        }
      >
        <img
          src={arrow}
          alt="arrow"
          className="Carousel__arrow"
          style={{
            transform: 'rotate(180deg)',
            opacity: translateValue === 0 ? 0.5 : 1,
          }}
        ></img>
      </button>

      <div
        className="Carousel__frame"
        style={{
          width: `${frameWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: `${gap}px`,
            transform: `translate(${translateValue}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <li key={i}>
              <img
                src={image}
                alt={`Image №${i}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  objectFit: 'contain',
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        onClick={() =>
          setTranslateValue(
            translateValue - getStepWidth(step) - gap < maxTranslateValue
              ? maxTranslateValue
              : translateValue - getStepWidth(step),
          )
        }
      >
        <img
          src={arrow}
          alt="arrow"
          className="Carousel__arrow"
          style={{
            opacity: translateValue === maxTranslateValue ? 0.5 : 1,
          }}
        ></img>
      </button>
    </div>
  );
};

export default Carousel;
