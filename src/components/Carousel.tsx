import React, { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface CarouselProps {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const gap = 20;
  const visibleImagesWidth = itemWidth * frameSize + (frameSize - 1) * gap;
  const newTranslateValue = step * (itemWidth + gap);
  const extremeTranslatePoint
  = -(itemWidth + gap) * (images.length - frameSize);

  const [currentValue, setCurrentValue] = useState(0);

  const handlePrev = () => {
    setCurrentValue((prevPos) => (prevPos + newTranslateValue
      >= 0 ? 0 : prevPos + newTranslateValue));

    if (infinite && currentValue === 0) {
      setCurrentValue(extremeTranslatePoint);
    }
  };

  const handleNext = () => {
    setCurrentValue((prevPos) => (
      prevPos - newTranslateValue <= extremeTranslatePoint
        ? extremeTranslatePoint
        : prevPos - newTranslateValue));

    if (infinite && currentValue === extremeTranslatePoint) {
      setCurrentValue(0);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={cn('button-prev', {
            'button-prev__disabled': !infinite && currentValue === 0,
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
          {images.map((image, index) => (
            <li
              className="Carousel__item"
              key={image}
              style={{
                transform: `translateX(${currentValue}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
        <button
          className={cn('button-next', {
            'button-next__disabled': !infinite
            && currentValue === extremeTranslatePoint,
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
