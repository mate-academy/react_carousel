import React, { useState } from 'react';
import './Carousel.scss';

type PropsType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: PropsType) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  function handlePrev() {
    setImageIndex(index => {
      if (index === 0 && infinite) {
        return images.length - frameSize;
      }

      if (index - step <= 0) {
        return 0;
      }

      return index - step;
    });
  }

  function handleNext() {
    setImageIndex(index => {
      if (index === images.length - frameSize && infinite) {
        return 0;
      }

      if (index + step >= images.length - frameSize) {
        return images.length - frameSize;
      }

      return index + step;
    });
  }

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        {images.map((img, index) => {
          return (
            <li
              key={img}
              className="img-container"
              style={{
                translate: `${-100 * imageIndex}%`,
                transition: `translate ${animationDuration}ms ease-in-out`,
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={img}
                alt={String(index + 1)}
                className="img"
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={handlePrev}
        className="prev button"
        style={{
          top: `${itemWidth + 50}px`,
          left: `${(frameSize * itemWidth) / 2 - 60}px`,
        }}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        className="next button"
        style={{
          top: `${itemWidth + 50}px`,
          left: `${(frameSize * itemWidth) / 2 + 10}px`,
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
