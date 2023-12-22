import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);
  const frameWidth = frameSize * itemWidth;
  const slide = step * itemWidth;
  const boundary = (itemWidth * images.length) - (frameSize * itemWidth);
  // const maxPosition = (itemWidth * images.length) - frameWidth;

  useEffect(() => {
    setPosition(currentPosition => Math.max(currentPosition, -boundary));
  }, [boundary]);

  const moveRight = () => {
    if (position !== -boundary) {
      setPosition(
        currentPosition => Math.max(currentPosition - slide, -boundary),
      );
    }
  };

  const moveLeft = () => {
    if (position !== 0) {
      setPosition(currentPosition => Math.min(currentPosition + slide, 0));
    }
  };

  const items = images.map(img => (
    <li
      className="Carousel__list-img"
      key={img}
      style={{ listStyle: 'none' }}
    >
      <img
        src={img}
        alt={img}
        width={itemWidth}
        style={{ transition: `width ${animationDuration}ms ease` }}
      />
    </li>
  ));

  return (
    <div
      className="Carousel"
      style={{
        transition: `all ${animationDuration}ms ease`,
      }}
    >
      <div
        className="Carousel__list-wrapper"
        style={{
          width: frameWidth,
          height: itemWidth,
          transition: `all ${animationDuration}ms ease`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            left: `${position}px`,
            transition: `left ${animationDuration}ms ease`,
          }}
        >
          {items}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          onClick={moveLeft}
          className="Carousel__button"
          data-cy="prev"
          type="button"
        >
          Prev
        </button>

        <button
          onClick={moveRight}
          className="Carousel__button"
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
