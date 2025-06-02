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
  const listRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState(0);

  const maxOffset = itemWidth * (images.length - frameSize);

  const scrollTo = (newPosition: number) => {
    if (listRef.current) {
      listRef.current.style.transition = `transform ${animationDuration}ms ease`;
      listRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const handleNext = () => {
    const newPosition = position + itemWidth * step;

    if (newPosition > maxOffset) {
      if (infinite) {
        setPosition(0);
      } else {
        setPosition(maxOffset);
      }
    } else {
      setPosition(newPosition);
    }
  };

  const handlePrev = () => {
    const newPosition = position - itemWidth * step;

    if (newPosition < 0) {
      if (infinite) {
        setPosition(maxOffset);
      } else {
        setPosition(0);
      }
    } else {
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    scrollTo(position);
  }, [position, animationDuration, itemWidth]);

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px` }}
      data-cy="carousel"
    >
      <button
        type="button"
        className={`Carousel__button left ${!infinite && position === 0 ? 'disabled' : ''}`}
        onClick={handlePrev}
        data-cy="prev-button"
      >
        «
      </button>

      <div className="Carousel__viewport">
        <ul
          ref={listRef}
          className="Carousel__list"
          style={{
            width: `${itemWidth * images.length}px`,
          }}
          data-cy="carousel-list"
        >
          {images.map((img, index) => (
            <li
              key={index}
              style={{
                width: `${itemWidth}px`,
                minWidth: `${itemWidth}px`,
              }}
              data-cy={`carousel-item-${index}`}
            >
              <img
                src={img}
                alt={`img-${index}`}
                style={{ width: `${itemWidth}px` }}
                data-cy="carousel-image"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={`Carousel__button right ${!infinite && position >= maxOffset ? 'disabled' : ''}`}
        onClick={handleNext}
        data-cy="next-button"
      >
        »
      </button>
    </div>
  );
};

export default Carousel;
