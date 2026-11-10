import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameWidth = frameSize * itemWidth;
  const translateX = -(currentIndex * itemWidth);
  const maxInd = images.length - frameSize;
  const nextInd = currentIndex + step;
  const prevInd = currentIndex - step;

  return (
    <div className="Carousel" style={{ width: `${frameWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          listStyle: `none`,
          padding: 0,
          transform: `translateX(${translateX}px)`,
          transitionDuration: `${animationDuration}ms`,
        }}
      >
        {images.map(image => (
          <li
            key={image}
            style={{
              width: itemWidth,
              height: itemWidth,
            }}
          >
            <img
              src={image}
              alt="carousel item"
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (prevInd >= 0) {
            setCurrentIndex(prevInd);
          }

          if (infinite === true && nextInd < 0) {
            setCurrentIndex(maxInd);
          }
        }}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={() => {
          if (nextInd <= maxInd) {
            setCurrentIndex(nextInd);
          }

          if (infinite === true && prevInd > maxInd) {
            setCurrentIndex(0);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
