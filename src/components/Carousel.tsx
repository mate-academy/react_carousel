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
    const isEnoughImages = indexStart + stepShift >= smile.length - size;

    if (isEnoughImages && !infinite) {
      setIndexImage(smile.length - size);
    } else if (isEnoughImages && infinite) {
      setIndexImage(0);
    } else {
      setIndexImage(indexStart + stepShift);
    }
  };

  const moveBack = (stepShift: number, smile: string[], size: number) => {
    const isEnoughImages = indexStart - stepShift < 0;

    if (isEnoughImages && !infinite) {
      setIndexImage(0);
    } else if (isEnoughImages && infinite) {
      setIndexImage(smile.length - size);
    } else {
      setIndexImage(indexStart - stepShift);
    }
  };

  const styleCarousel = {
    width: `${itemWidth * frameSize}px`,
  };

  const styleImages = {
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${indexStart * itemWidth}px)`,
  };

  return (
    <>
      <div
        className="Carousel"
        style={styleCarousel}
      >
        <ul
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={styleImages}
            >
              <img
                src={image}
                alt={index.toString()}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="button-section">
        <button
          className="button is-link"
          type="button"
          disabled={indexStart === 0 && !infinite}
          onClick={() => {
            moveBack(step, images, frameSize);
          }}
        >
          Prev
        </button>
        <button
          className="button is-link"
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
    </>
  );
};

export default Carousel;
