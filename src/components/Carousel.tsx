import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
}) => {
  const carouselWidth = frameSize * itemWidth;
  const [firstIndex, setFirstIndex] = useState(0);
  const [transition, setTransition] = useState('transform 1000ms ease-in-out');

  const handleNext = () => {
    setFirstIndex(firstInd =>
      Math.min(firstInd + step, images.length - frameSize),
    );
    setTransition(`transform ${animationDuration} ease-in-out`);
  };

  const handlePrev = () => {
    setFirstIndex(firstInd => Math.max(0, firstInd - step));
    setTransition(`transform ${animationDuration} ease-in-out`);
  };

  return (
    <div className="Carousel">
      <div className="Carousel-container">
        <ul
          style={{
            width: carouselWidth,
            transform: `translateX(-${firstIndex * itemWidth}px)`,
            transition,
          }}
          className="Carousel__list"
        >
          {images.map((image, index) => {
            return (
              <li className="Carousel__list-item" key={image}>
                <img
                  src={image}
                  alt={`${images[index]}`}
                  width={`${itemWidth}px`}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button type="button" onClick={handlePrev} disabled={firstIndex === 0}>
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={firstIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
