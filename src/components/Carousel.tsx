import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [transform, setTransform] = useState(0);

  const minTransform = -(itemWidth * images.length - itemWidth * frameSize);
  const maxTransform = 0;

  const powerTransform = step * itemWidth;

  const handleNextTransform = () => {
    if (infinite && transform <= minTransform) {
      setTransform(0);

      return;
    }

    const newTransform = Math.max(transform - powerTransform, minTransform);

    setTransform(newTransform);
  };

  const handlePrevTransform = () => {
    if (infinite && transform >= maxTransform) {
      setTransform(minTransform);

      return;
    }

    const newTransform = Math.min(transform + powerTransform, maxTransform);

    setTransform(newTransform);
  };

  return (
    <div className="Carousel">
      <button
        disabled={!infinite && transform >= maxTransform}
        onClick={() => {
          handlePrevTransform();
        }}
        className="Carousel__arrow-button"
        type="button"
      >
        {'<'}
      </button>
      <div
        style={{ width: itemWidth * frameSize }}
        className="Carousel__container"
      >
        <ul
          style={{
            transitionDuration: `${animationDuration}ms`,
            transitionProperty: 'transform',
            transform: `translateX(${transform}px)`,
          }}
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <li key={image} data-cy="item">
              <img
                className="Carousel__image"
                width={itemWidth}
                src={image}
                alt={String(index + 1)}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => {
          handleNextTransform();
        }}
        disabled={!infinite && transform <= minTransform}
        className="Carousel__arrow-button"
        data-cy="next"
        type="button"
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
