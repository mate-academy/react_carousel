import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(1);

  const carouselSize = frameSize * itemWidth;
  const currentShift = (currentImage - 1) * itemWidth;
  const lastPossibleImage = images.length - frameSize + 1;

  const isStart = currentImage === 1;
  const isEnd = currentImage === lastPossibleImage;

  const handleNextImage = () => {
    if (!isEnd) {
      const nextImage = currentImage + step;

      setCurrentImage(nextImage > lastPossibleImage
        ? lastPossibleImage
        : nextImage);
    } else if (infinite) {
      setCurrentImage(1);
    }
  };

  const handlePrevImage = () => {
    if (!isStart) {
      const prevImage = currentImage - step;

      setCurrentImage(prevImage < 1
        ? 1
        : prevImage);
    } else if (infinite) {
      setCurrentImage(lastPossibleImage);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${carouselSize}px` }}
      >
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(-${currentShift}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className={cn('Carousel__button', {
            'Carousel__button--disabled': (isStart && !infinite),
          })}
          onClick={handlePrevImage}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className={cn('Carousel__button', {
            'Carousel__button--disabled': (isEnd && !infinite),
          })}
          onClick={handleNextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};
