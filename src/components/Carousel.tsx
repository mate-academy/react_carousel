import React, { useCallback, useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + step;
      const remainingIndex = images.length - newIndex;

      if (infinite) {
        return newIndex % images.length;
      }

      if (remainingIndex >= frameSize) {
        return newIndex;
      }

      return remainingIndex > 0 ? currentIndex + 1 : 0;
    });
  }, [infinite, setCurrentIndex, step, images, frameSize, currentIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - step;

      if (infinite) {
        return (newIndex + images.length) % images.length;
      }

      return newIndex < 0 ? images.length - frameSize : newIndex;
    });
  }, [infinite, setCurrentIndex, step, images, frameSize]);

  return (

    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          overflow: 'hidden',
          width: `${itemWidth * frameSize}px`,
          margin: '0 auto',
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index: number) => (
            <li
              key={image}
              style={{
                transform: `translateX(${-currentIndex * itemWidth}px)`,
                transition: `transform ${animationDuration / 1000}s ease-in-out`,
              }}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  height: `${itemWidth}`,
                  width: `${itemWidth}`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__container--button">
          <button
            className={`Carousel__button ${currentIndex === 0 ? 'disabled' : ''}`}
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            Prev
          </button>
          <button
            className={`Carousel__button ${currentIndex + step >= images.length ? 'disabled' : ''}`}
            type="button"
            onClick={nextSlide}
            disabled={currentIndex + step >= images.length}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
