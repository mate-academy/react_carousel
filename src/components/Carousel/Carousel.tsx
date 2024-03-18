import React, { useState, useEffect } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../../types/Setting';
import cn from 'classnames';

enum Direction {
  PREV = 'prev',
  NEXT = 'next',
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const visibleImages = images.slice(
    scrollPosition,
    scrollPosition + frameSize,
  );

  useEffect(() => {
    if (scrollPosition + frameSize > images.length) {
      setScrollPosition(images.length - frameSize);
    }
  }, [frameSize]);

  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollPosition >= images.length - frameSize;

  const handleScrollClick = (direction: Direction) => () => {
    setScrollPosition(prevPosition =>
      direction === Direction.PREV
        ? Math.max(prevPosition - step, 0)
        : Math.min(prevPosition + step, images.length - frameSize),
    );
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${frameSize * itemWidth}px`,
          height: `${itemWidth}px`,
        }}
      >
        {images.map((image, index) => (
          <li
            className="Carousel__item"
            key={`item${index}`}
            style={{
              transition: `all ${animationDuration}ms ease`,
              transform: `translateX(-${scrollPosition * itemWidth}px)`,
              visibility: visibleImages.includes(image) ? 'visible' : 'hidden',
            }}
          >
            <img
              className="Carousel__img"
              src={image}
              alt={`Image ${index}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        className={cn('Carousel__button', {
          'Carousel__button--disabled': isAtStart,
        })}
        type="button"
        onClick={handleScrollClick(Direction.PREV)}
      >
        Prev
      </button>
      <button
        className={cn('Carousel__button', {
          'Carousel__button--disabled': isAtEnd,
        })}
        data-cy="next"
        type="button"
        onClick={handleScrollClick(Direction.NEXT)}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
