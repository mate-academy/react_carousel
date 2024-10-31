import React, { useState, useRef, useEffect } from 'react';
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
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const maxIndex = infinite ? images.length : images.length - frameSize;

  const next = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + step;

      if (newIndex >= maxIndex) {
        return infinite ? 0 : Math.min(images.length - frameSize, maxIndex);
      }

      return newIndex;
    });
  };

  const prev = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex - step;

      if (newIndex < 0) {
        return infinite ? maxIndex - step : 0;
      }

      return newIndex;
    });
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.transition = `transform ${animationDuration}ms ease`;
      listRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex, animationDuration, itemWidth]);

  const visibleItems = Math.min(frameSize, images.length - currentIndex);

  return (
    <div
      className="Carousel"
      style={{ overflow: 'hidden', width: `${visibleItems * itemWidth}px` }}
    >
      <ul
        className="Carousel__list"
        ref={listRef}
        style={{
          width: `${images.length * itemWidth}px`,
          display: 'flex',
        }}
      >
        {images.map((image, index) => (
          <li key={index} style={{ width: itemWidth }}>
            <img
              src={image}
              alt={`Carousel item ${index + 1}`}
              data-cy={`carousel-image-${index}`}
              style={{ width: itemWidth, height: 'auto' }}
            />
          </li>
        ))}
      </ul>

      <button type="button" data-cy="prev" onClick={prev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
