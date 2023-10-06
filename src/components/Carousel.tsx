import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  // infinite: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  // infinite,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollPositionLeft = () => {
    let newPositoin = scrollPosition + itemWidth * step;

    if (newPositoin > 0) {
      newPositoin = 0;
    }

    setScrollPosition(newPositoin);
  };

  const scrollPositionRight = () => {
    let newPositoin = scrollPosition - itemWidth * step;

    if ((newPositoin - step * itemWidth) < -(itemWidth * images.length)) {
      newPositoin = itemWidth * -(images.length - step);
    }

    setScrollPosition(newPositoin);
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
            <li>
              <img
                src={image}
                alt="Smile"
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

      </div>
      <button
        type="button"
        onClick={scrollPositionLeft}
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
        }}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
