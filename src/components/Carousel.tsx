import React, { useState } from 'react';
import classNames from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean; // Додано властивість
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false, // Значення за замовчуванням
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + step;

      if (nextIndex > maxIndex) {
        // Якщо нескінченно — перекидаємо на початок, інакше — стоп на максимумі
        return infinite ? 0 : maxIndex;
      }

      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev - step;

      if (nextIndex < 0) {
        // Якщо нескінченно — перекидаємо в кінець, інакше — стоп на 0
        return infinite ? maxIndex : 0;
      }

      return nextIndex;
    });
  };

  const offset = currentIndex * itemWidth;

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className={classNames('Carousel__btn', {
            // Кнопка ніколи не disabled, якщо ввімкнено infinite
            disabled: !infinite && currentIndex === 0,
          })}
          onClick={handlePrev}
          disabled={!infinite && currentIndex === 0}
        >
          &lt;
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
              const isVisible = index >= currentIndex && index < currentIndex + frameSize;

              return (
                <li
                  key={`${url}-${index}`}
                  className="Carousel__item"
                  style={{
                    minWidth: itemWidth,
                    maxWidth: itemWidth,
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity ${animationDuration}ms`,
                  }}
                >
                  <img src={url} alt={`img-${index + 1}`} width={itemWidth} />
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          data-cy="next"
          className={classNames('Carousel__btn', {
            disabled: !infinite && currentIndex >= maxIndex,
          })}
          onClick={handleNext}
          disabled={!infinite && currentIndex >= maxIndex}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
