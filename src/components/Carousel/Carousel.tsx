import React, { useState, useEffect } from 'react';
import './Carousel.scss';
import { CarouselProps } from '../../types/Setting';

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

  const handleScrollClick = (direction: 'Prev' | 'Next') => () => {
    if (direction === 'Prev') {
      setScrollPosition(prevScrollPosition =>
        Math.max(prevScrollPosition - step, 0),
      );
    } else if (direction === 'Next') {
      setScrollPosition(prevScrollPosition =>
        Math.min(prevScrollPosition + step, images.length - frameSize),
      );
    }
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
        className={`Carousel__button ${isAtStart ? 'Carousel__button--disabled' : ''}`}
        type="button"
        onClick={handleScrollClick('Prev')}
      >
        Prev
      </button>
      <button
        className={`Carousel__button ${isAtEnd ? 'Carousel__button--disabled' : ''}`}
        data-cy="next"
        type="button"
        onClick={handleScrollClick('Next')}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
