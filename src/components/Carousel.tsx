import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false, // Залишаємо на майбутнє для зірочки
}) => {
  // Зберігаємо індекс першої видимої картинки
  const [currentIndex, setCurrentIndex] = useState(0);

  // Максимально можливий індекс, щоб не було порожнього місця в кінці
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setCurrentIndex(prev => {
      // Якщо ми дійшли до кінця
      if (prev === maxIndex) {
        return infinite ? 0 : prev; // Якщо нескінченна - стрибаємо на 0, інакше стоїмо
      }

      // Звичайний крок вперед
      return Math.min(prev + step, maxIndex);
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      // Якщо ми на самому початку
      if (prev === 0) {
        return infinite ? maxIndex : prev; // Якщо нескінченна - стрибаємо в кінець
      }

      // Звичайний крок назад
      return Math.max(prev - step, 0);
    });
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        className="Carousel__btn Carousel__btn--prev"
        onClick={handlePrev}
        // Блокуємо тільки якщо НЕ нескінченна І ми на початку
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>

      <div
        className="Carousel__window"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map(img => (
            <li
              key={img}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={img}
                alt="Carousel item"
                className="Carousel__img"
                width={itemWidth} // Додаємо цей атрибут для тестів
                height={itemWidth} // Додаємо висоту для ідеального квадрата
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        className="Carousel__btn Carousel__btn--next"
        onClick={handleNext}
        // Блокуємо тільки якщо НЕ нескінченна І ми в кінці
        disabled={!infinite && currentIndex === maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
