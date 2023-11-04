import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,

}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const moveBack = () => (
    currentImgIndex !== 0
      ? setCurrentImgIndex(prevIndex => Math.max(prevIndex - step, 0))
      : setCurrentImgIndex(maxIndex)
  );

  const moveForward = () => (
    currentImgIndex !== maxIndex
      ? setCurrentImgIndex(prevIndex => Math.min(prevIndex + step, maxIndex))
      : setCurrentImgIndex(0)
  );

  return (
    <div
      className="Carousel"
      style={{
        width: `${itemWidth * frameSize}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul
        className="Carousel__list"
      >
        {images.map((image, i) => (
          <li
            className="Carousel__item"
            key={image}
            style={{
              transform: `translateX(${-(currentImgIndex * itemWidth)}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__img"
              src={image}
              alt={`${i + 1}`}
              width={itemWidth}
              style={{ transition: `${animationDuration}ms` }}
            />
          </li>
        ))}
      </ul>

      <div className="btn-block">
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={moveBack}
          disabled={!infinite && currentImgIndex === 0}
        >
          Prev
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-cy="next"
          onClick={moveForward}
          disabled={!infinite && currentImgIndex === maxIndex}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Carousel;
