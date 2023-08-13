import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const gap = 20;
  const visibleImagesWidth = itemWidth * frameSize + ((frameSize - 1) * gap);
  const [translateValue, setTranslateValue] = useState(0);
  const newTranslateValue = step * (itemWidth + gap);
  const extremeTranslatePoint
  = -(itemWidth + gap) * (10 - frameSize);

  const handlePrev = () => {
    setTranslateValue(
      translateValue + newTranslateValue >= 0
        ? 0
        : prevPos => prevPos + newTranslateValue,
    );

    if (infinite && translateValue === 0) {
      setTranslateValue(extremeTranslatePoint);
    }
  };

  const handleNext = () => {
    setTranslateValue(
      translateValue - newTranslateValue <= extremeTranslatePoint
        ? extremeTranslatePoint
        : prevPos => prevPos - newTranslateValue,
    );

    if (infinite && translateValue === extremeTranslatePoint) {
      setTranslateValue(0);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={cn('button-prev', {
            'button-prev__disabled': !infinite && translateValue === 0,
          })}
          type="button"
          onClick={handlePrev}
        >
          <div className="button-prev__text">&lt;</div>
        </button>
        <ul
          className="Carousel__list"
          style={{
            width: `${visibleImagesWidth}px`,
            gap: `${gap}px`,
          }}
        >
          {images.map(image => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img
                src={image}
                alt={`${images.indexOf(image) + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
        <button
          className={cn('button-next', {
            'button-next__disabled': !infinite
            && translateValue === extremeTranslatePoint,
          })}
          type="button"
          data-cy="next"
          onClick={handleNext}
        >
          <div className="button-next__text">&gt;</div>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
