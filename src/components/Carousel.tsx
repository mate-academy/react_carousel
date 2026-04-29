import React, { useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + step, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - step, 0));
  };

  const offset = currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className={classNames('Carousel__btn', {
            disabled: currentIndex === 0,
          })}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </button>

        <div
          className="Carousel__frame"
          style={{ width: itemWidth * frameSize }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((url, index) => {
              // Перевірка: чи знаходиться картинка в поточному "кадрі"
              const isVisible = index >= currentIndex && index < currentIndex + frameSize;

              return (
                <li
                  key={url}
                  className="Carousel__item"
                  style={{
                    minWidth: itemWidth,
                    maxWidth: itemWidth,
                    // Якщо картинка поза кадром — робимо її повністю прозорою для Cypress
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity ${animationDuration}ms`,
                  }}
                >
                  <img
                    src={url}
                    alt={`img-${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          data-cy="next"
          className={classNames('Carousel__btn', {
            disabled: currentIndex >= maxIndex,
          })}
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
