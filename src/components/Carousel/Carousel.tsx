import React, { useEffect, useState } from 'react';

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

  const IMAGE_QTY = images.length;
  const OVERFLOW_WIDTH = itemWidth * frameSize;
  const CONTAINER_WIDTH = itemWidth * IMAGE_QTY;
  const TRANSFORM = step * itemWidth;
  const LEFT_LAST_SLIDE = transform + TRANSFORM < 0;
  const RIGHT_LAST_SLIDE = transform * -1 + TRANSFORM * 2 < CONTAINER_WIDTH;

  useEffect(() => {
    setLastLeftSlide(false);
    setLastRightSlide(false);
    setTransform(0);
  }, [step]);

  const handleNextMove = () => {
    if (infinite && transform === (CONTAINER_WIDTH - OVERFLOW_WIDTH) * -1) {
      setTransform(0);
      setLastRightSlide(false);

      return;
    }

    if (RIGHT_LAST_SLIDE) {
      setTransform(prevState => prevState - TRANSFORM);
      if (lastLeftSlide) {
        setLastLeftSlide(false);
      }
    } else {
      setTransform((CONTAINER_WIDTH - OVERFLOW_WIDTH) * -1);
      setLastRightSlide(true);
    }
  };

  const handleBackMove = () => {
    if (LEFT_LAST_SLIDE) {
      setTransform(prevState => prevState + TRANSFORM);
      if (lastRightSlide) {
        setLastRightSlide(false);
      }
    } else {
      setTransform(0);
      setLastLeftSlide(true);
    }
  };

  if (animationDuration) {
    setTimeout(() => {
      handleNextMove();
    }, animationDuration);
  }

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{ width: `${OVERFLOW_WIDTH}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${transform}px)`,
            width: `${CONTAINER_WIDTH}px`,
          }}
        >
          {images.map(image => (
            <li
              key={image.id}
              className="Carousel__item"
              style={{
                height: `${itemWidth}px`,
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={image.src}
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
          {...(lastRightSlide && { disabled: true })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
