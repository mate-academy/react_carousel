import React, { useState } from 'react';
// import classNames from 'classnames';
import './Carousel.scss';
interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}
const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  // infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        overflow: `hidden`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms`,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
        }}
      >
        {images.map(image => (
          <li key={image}>
            <img src={image} alt={image} width={itemWidth} />
          </li>
        ))}
      </ul>
      <button
        data-cy="prev"
        type="button"
        onClick={() => {
          setCurrentIndex(Math.max(currentIndex - step, 0));
        }}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => {
          setCurrentIndex(
            Math.min(currentIndex + step, images.length - frameSize),
          );
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
