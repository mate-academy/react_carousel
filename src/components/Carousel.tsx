import React from 'react';
import './Carousel.scss';
import { useState } from 'react';

type Props = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [firstIndex, setFirstIndex] = useState(0);
  const transition = `transform ${animationDuration}ms ease-in-out`;
  const nextImgCheck = firstIndex === images.length - frameSize;
  const prevImgCheck = firstIndex === 0;

  const changeIndexPrev = () => {
    if (firstIndex > 0 && firstIndex - step >= 0) {
      setFirstIndex(firstIndex - step);
    } else {
      setFirstIndex(0);
    }
  };

  const changeIndexNext = () => {
    if (
      firstIndex < images.length - frameSize &&
      firstIndex + step < images.length - frameSize
    ) {
      setFirstIndex(firstIndex + step);
    } else {
      setFirstIndex(images.length - frameSize);
    }
  };

  return (
    <div className="Carousel toCenter">
      <div
        className="container paddings"
        style={{
          width: `${itemWidth * frameSize}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list list"
          style={{
            transform: `translateX(-${firstIndex * itemWidth}px)`,
            transition: transition,
          }}
        >
          {images.map(image => {
            return (
              <li key={parseInt(image)}>
                <img
                  src={image}
                  alt={parseInt(image).toString()}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="buttons-container paddings">
        <button
          type="button"
          className={`button ${prevImgCheck ? 'disabled' : ''}`}
          onClick={changeIndexPrev}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          className={`button ${nextImgCheck ? 'disabled' : ''}`}
          onClick={changeIndexNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
