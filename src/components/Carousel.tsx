import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickPrev = () => {
    setCurrentIndex(index => Math.max(index - step, 0));
  };

  const clickNext = () => {
    const maxIndex = images.length - frameSize;

    setCurrentIndex(index => Math.min(index + step, maxIndex));
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${images.length * itemWidth}px`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((img, index) => (
            <li key={index}>
              <img
                style={{ width: `${itemWidth}px` }}
                src={img}
                alt={`Image ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button disabled={currentIndex === 0} onClick={clickPrev} type="button">
        Prev
      </button>
      <button
        data-cy="next"
        disabled={currentIndex + frameSize >= images.length}
        onClick={clickNext}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
