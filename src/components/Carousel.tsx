import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesToShow = frameSize * itemWidth;
  const transformTranslateLength = currentIndex * itemWidth;
  const maxShiftOrder = images.length - frameSize;

  const isPrevButtonDisabled = currentIndex === 0 && !infinite;
  const isNextButtonDisabled = currentIndex >= maxShiftOrder && !infinite;

  const enum MoveTo {
    forward = 'forward',
    back = 'back',
  }

  const move = (direction: MoveTo): void => {
    switch (direction) {
      case 'forward':
        if (!isNextButtonDisabled) {
          setCurrentIndex(prevIndex =>
            Math.min(prevIndex + step, maxShiftOrder),
          );
        }

        if (infinite && currentIndex === maxShiftOrder) {
          setCurrentIndex(0);
        }

        break;
      case 'back':
        if (!isPrevButtonDisabled) {
          setCurrentIndex(prevIndex => Math.max(prevIndex - step, 0));
        }

        if (infinite && currentIndex === 0) {
          setCurrentIndex(maxShiftOrder);
        }

        break;
      default:
    }
  };

  return (
    <div className="Carousel" style={{ maxWidth: `${imagesToShow}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${transformTranslateLength}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((el, index) => (
          <li className="Carousel__item" key={el}>
            <img src={el} alt={`${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        {/* eslint-disable-next-line */}
        <button
          disabled={isPrevButtonDisabled}
          className="Carousel__button"
          type="button"
          onClick={() => move(MoveTo.back)}
        >
          <FaArrowLeft className="Carousel__button-icon" />
        </button>
        {/* eslint-disable-next-line */}
        <button
          data-cy="next"
          disabled={isNextButtonDisabled}
          className="Carousel__button"
          type="button"
          onClick={() => move(MoveTo.forward)}
        >
          <FaArrowRight className="Carousel__button-icon" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
