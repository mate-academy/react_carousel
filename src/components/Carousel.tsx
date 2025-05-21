import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const totalItems = images.length;
  const maxTranslate = Math.max(0, totalItems - frameSize);

  const handleNext = () => {
    setPosition(prev => {
      if (prev >= maxTranslate) {
        return infinite ? 0 : prev;
      }

      return Math.min(prev + step, maxTranslate);
    });
  };

  const handlePrev = () => {
    setPosition(prev => {
      if (prev <= 0) {
        return infinite ? maxTranslate : prev;
      }

      return Math.max(prev - step, 0);
    });
  };

  const isNextDisabled = !infinite && position >= maxTranslate;
  const isPrevDisabled = !infinite && position <= 0;

  const transformX = -position * (itemWidth + 10);

  return (
    <div className="carousel">
      <div
        className="carousel__frame"
        style={{
          width: frameSize * (itemWidth + 10),
          overflow: 'hidden',
        }}
      >
        <ul
          className="carousel__list"
          style={{
            display: 'flex',
            transform: `translateX(${transformX}px)`,
            transition: `transform ${animationDuration}ms ease`,
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          {images.map((img, index) => {
            const isVisible = index >= position && index < position + frameSize;

            return (
              <li
                key={img + index}
                className={cn('carousel__item', {
                  'carousel__item--hidden': !isVisible,
                })}
                style={{ width: itemWidth }}
                data-cy={`img-${index + 1}`}
              >
                <img src={img} alt={`Image ${index + 1}`} width={itemWidth} />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className={cn('carousel__button', 'carousel__button--prev', {
          'carousel__button--disabled': isPrevDisabled,
        })}
        disabled={isPrevDisabled}
        data-cy="prev"
      ></button>

      <button
        type="button"
        onClick={handleNext}
        className={cn('carousel__button', 'carousel__button--next', {
          'carousel__button--disabled': isNextDisabled,
        })}
        disabled={isNextDisabled}
        data-cy="next"
      ></button>
    </div>
  );
};

export default Carousel;
