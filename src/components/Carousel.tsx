import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex((currentIndex + step) % images.length);
    } else {
      setCurrentIndex(Math.min(currentIndex + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex((currentIndex - step) % images.length);
    } else {
      setCurrentIndex(Math.max(0, currentIndex - step));
    }
  };

  return (
    <div className="Carousel">
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <div
        className="Carousel__frame"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, indx) => (
            <li
              key={img}
              className="Carousel__item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={img}
                alt={`Image ${indx + 1}`}
                className="Carousel__img"
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
