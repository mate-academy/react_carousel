import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselWidth = itemWidth * frameSize;
  const maxIndex = images.length - frameSize;

  const minTranslate = 0;

  const handleNext = () => {
    setCurrentIndex(() => (currentIndex + step > maxIndex
      ? maxIndex
      : currentIndex + step));
  };

  const handlePrevious = () => {
    setCurrentIndex(() => (currentIndex - step < minTranslate
      ? minTranslate
      : currentIndex - step));
  };

  const visibleItems = images.map((image: string) => (
    <li
      className="Carousel__item"
      key={image}
      style={{
        transform: `translateX(${-currentIndex * itemWidth}px)`,
        transition: `transform ${animationDuration}ms ease 0s`,
      }}
    >
      <img
        src={image}
        alt={`${currentIndex}`}
        style={{
          height: itemWidth,
          width: itemWidth,
        }}
      />
    </li>
  ));

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrevious}
        className={cn('Carousel__button', {
          disabled: currentIndex === 0,
        })}
      >
        Prev
      </button>

      <ul
        className="Carousel__list"
        style={{
          width: `${carouselWidth}px`,
        }}
      >
        {visibleItems}
      </ul>

      <button
        type="button"
        onClick={handleNext}
        className={cn('Carousel__button', {
          disabled: currentIndex === maxIndex,
        })}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
