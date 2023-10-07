import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [positionLeft, setPositionLeft] = useState(false);
  const [positionRight, setPositionRight] = useState(false);

  const scrollPositionLeft = () => {
    let newPosition = scrollPosition + itemWidth * step;

    if (infinite) {
      newPosition = itemWidth * -(images.length - step);
      setPositionRight(true);
      setScrollPosition(newPosition);

      return;
    }

    if (newPosition > 0) {
      newPosition = 0;
      setPositionLeft(true);
    } else {
      setPositionRight(false);
      setPositionLeft(false);
    }

    setScrollPosition(newPosition);
  };

  const scrollPositionRight = () => {
    let newPosition = scrollPosition - itemWidth * step;

    if (infinite) {
      newPosition = 0;
      setPositionLeft(true);
      setScrollPosition(newPosition);

      return;
    }

    if ((newPosition - step * itemWidth) < -(itemWidth * images.length)) {
      newPosition = itemWidth * -(images.length - step);
      setPositionRight(true);
    } else {
      setPositionLeft(false);
      setPositionRight(false);
    }

    setScrollPosition(newPosition);
  };

  return (
    <div
      className="Container"
      style={{
        width: `${frameSize * itemWidth}px`,
        position: 'relative',
      }}
    >
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(image => (
            <li className="Carousel__item">
              <img
                src={image}
                alt="Smile"
                key={image}
                style={{
                  width: `${itemWidth}px`,
                }}
                className="Carousel__img"
              />
            </li>
          ))}
        </ul>

      </div>
      <button
        type="button"
        onClick={scrollPositionLeft}
        disabled={positionLeft && !infinite}
        style={{
          visibility: itemWidth * step >= -55 && itemWidth * frameSize <= 55
            ? 'hidden' : 'visible',
        }}
      >
        &#8592;
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={scrollPositionRight}
        style={{
          position: 'absolute',
          right: '0',
          visibility: itemWidth * step >= -55 && itemWidth * frameSize <= 55
            ? 'hidden' : 'visible',
        }}
        disabled={positionRight && !infinite}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
