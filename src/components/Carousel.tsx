/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import './Carousel.scss';
import { type States } from './types/States';

const Carousel: React.FC<States> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const Gap = 10;

  const [picture, setPicture] = useState(0);
  const carouselWidth = frameSize * itemWidth + (frameSize - 1) * Gap;
  const disabledLeft = !infinite && picture === 0;
  const disabledRight = !infinite && picture >= images.length - frameSize;

  const goLeft = () => {
    if (infinite && picture === 0) {
      setPicture(images.length - frameSize);
    } else {
      setPicture(prev => Math.max(0, prev - step));
    }
  };

  const goRight = () => {
    if (infinite && picture >= images.length - frameSize) {
      setPicture(0);
    } else {
      setPicture(next => Math.min(next + step, images.length - frameSize));
    }
  };

  return (
    <>
      <div className="carousel">
        <div
          className="carousel__container"
          style={{
            width: `${carouselWidth}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              gap: Gap,
              transform: `translateX(-${picture * (itemWidth + Gap)}px)`,
              transition: `transform ${animationDuration}ms ease`,
            }}
          >
            {images.map((image, index) => (
              <li>
                <img
                  src={image}
                  alt={`${index + 1}`}
                  className="carousel__picture"
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            type="button"
            onClick={goLeft}
            className="carousel__button--prev"
            disabled={disabledLeft}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goRight}
            className="carousel__button--next"
            disabled={disabledRight}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
