import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameWidth: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameWidth,
  itemWidth,
  step,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = itemWidth * (images.length - frameWidth);

  const nextButton = () => {
    if (infinite || position < maxPosition) {
      if (position + step * itemWidth > maxPosition && infinite) {
        setPosition(0);
      } else {
        setPosition(position + step * itemWidth);
      }
    }
  };

  const prevButton = () => {
    if (infinite || position > 0) {
      if (position - step * itemWidth < 0 && infinite) {
        setPosition(maxPosition);
      } else {
        setPosition(position - step * itemWidth);
      }
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${frameWidth * itemWidth}px`,
        }}
      >
        {images.map((image) => (
          <li
            key={image}
            className="Carousel__item"
            style={{
              transform: `translateX(-${position}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={`${image}`}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth * 1.05}px`,
              }}
              alt=""
              className="Carousel-img"
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={prevButton}

      >
        Prev
      </button>
      <button
        type="button"
        onClick={nextButton}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
