import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  step: number,
  frameSize: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [indexStart, setIndexImage] = useState(0);

  const moveForward = (stepShift: number, smile: string[], size: number) => {
    if (indexStart + stepShift >= smile.length - size && !infinite) {
      setIndexImage(smile.length - size);
    } else if (indexStart + stepShift >= smile.length - size && infinite) {
      setIndexImage(0);
    } else {
      setIndexImage(indexStart + stepShift);
    }
  };

  const moveBack = (stepShift: number, smile: string[], size: number) => {
    if (indexStart - stepShift < 0 && !infinite) {
      setIndexImage(0);
    } else if (indexStart - stepShift < 0 && infinite) {
      setIndexImage(smile.length - size);
    } else {
      setIndexImage(indexStart - stepShift);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
      }}
    >
      <ul
        className="Carousel__list"

      >
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              transitionDuration: `${animationDuration}ms`,
              transform: `translateX(-${indexStart * itemWidth}px)`,
            }}
          >
            <img
              src={image}
              alt={index.toString()}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={indexStart === 0 && !infinite}
          onClick={() => {
            moveBack(step, images, frameSize);
          }}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={indexStart > images.length - frameSize - 1 && !infinite}
          onClick={() => {
            moveForward(step, images, frameSize);
          }}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
