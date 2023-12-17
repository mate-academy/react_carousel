import React, { useState } from 'react';
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
  const widthFrame = itemWidth * frameSize;
  const widthList = itemWidth * images.length - widthFrame;

  const moveRight = () => {
    if (position !== -widthList
        && widthList - Math.abs(position) >= widthFrame) {
      setPosition((currentPosition) => currentPosition - itemWidth * step);
    } else {
      setPosition(-widthList);
    }
  };

  const moveLeft = () => {
    if (position !== 0 && Math.abs(position) >= widthFrame) {
      setPosition((currentPosition) => currentPosition + itemWidth * step);
    } else {
      setPosition(0);
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
        style={{ width: `${itemWidth}px` }}
      />
    </li>
  ));

  return (
    <div
      className="Carousel"
      style={{ width: `${widthFrame}px` }}
    >
      <h1 className="Carousel__title" data-cy="title">
        {/* eslint-disable-next-line */}
        Carousel with {images.length} images
      </h1>

      <div className="Carousel__list-wrapper">
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
