import React, { useState } from 'react';

import './Carousel.scss';

import { Images } from '../../types/Images';

type State = {
  images: Images[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<State> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [transform, setTransform] = useState(0);
  const [lastRightSlide, setLastRightSlide] = useState(false);
  const [lastLeftSlide, setLastLeftSlide] = useState(false);
  const [imagesLeft, setImagesLeft] = useState(images.length - step);

  const IMAGE_QTY = images.length;
  const OVERFLOW_WIDTH = itemWidth * frameSize;
  const CONTAINER_WIDTH = itemWidth * IMAGE_QTY;
  const TRANSFORM = step * itemWidth;
  const LEFT_LAST_SLIDE = transform + TRANSFORM < 0;
  const RIGHT_LAST_SLIDE = imagesLeft - step < 0;

  const handleNextMove = () => {
    if (lastLeftSlide) {
      setLastLeftSlide(false);
    }

    if (infinite && imagesLeft === 0) {
      setTransform(0);
      setLastRightSlide(false);
      setImagesLeft(images.length - step);

      return;
    }

    if (RIGHT_LAST_SLIDE) {
      setTransform(prevState => prevState - imagesLeft * itemWidth);
      setLastRightSlide(true);
      setImagesLeft(0);

      return;
    }

    setTransform(prevState => prevState - TRANSFORM);
    setImagesLeft(prevState => prevState - step);
  };

  const handleBackMove = () => {
    if (lastRightSlide) {
      setLastRightSlide(false);
    }

    if (LEFT_LAST_SLIDE) {
      setTransform(prevState => prevState + TRANSFORM);
      setImagesLeft(prevState => prevState + step);
    } else {
      setTransform(0);
      setLastLeftSlide(true);
      setImagesLeft(images.length - step);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${OVERFLOW_WIDTH - 1}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${transform}px)`,
            width: `${CONTAINER_WIDTH}px`,
            transition: `${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li
              key={image.id}
              className="Carousel__item"
              style={{
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={image.src}
                width={itemWidth}
                className="Carousel__img"
                alt={`The image number ${image.id + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="button"
          type="button"
          onClick={handleBackMove}
          {...(lastLeftSlide && { disabled: true })}
        >
          Prev
        </button>
        <button
          className="button"
          data-cy="next"
          type="button"
          onClick={handleNextMove}
          {...(lastRightSlide && !infinite && { disabled: true })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
