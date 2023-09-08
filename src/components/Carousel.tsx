import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const lastFrame = images.length - frameSize;

  const moveLeft = (stepShift: number) => {
    const isEnoughImages = stepShift - startIndex >= 0;

    if (startIndex === 0 && infinite) {
      setStartIndex(lastFrame);
    } else if (isEnoughImages) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex - stepShift);
    }
  };

  const moveRight = (stepShift: number) => {
    const isEnoughImages = startIndex + stepShift >= lastFrame;

    if (startIndex === lastFrame && infinite) {
      setStartIndex(0);
    } else if (isEnoughImages) {
      setStartIndex(lastFrame);
    } else {
      setStartIndex(startIndex + stepShift);
    }
  };

  const styleCarousel = {
    width: `${itemWidth * frameSize}px`,
  };

  const itemStyle = {
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${startIndex * itemWidth}px)`,
  };

  return (
    <div
      className="Carousel"
      style={styleCarousel}
    >
      <ul
        className="Carousel__list"
      >
        {images.map(image => (
          <li
            key={image}
            style={itemStyle}
          >
            <img
              className="Carousel__image"
              width={itemWidth}
              src={image}
              alt={image.slice(6, 7)}
            />
          </li>
        ))}

      </ul>

      <div className="Carousel_buttons">
        <button
          type="button"
          disabled={startIndex === 0 && !infinite}
          onClick={() => moveLeft(step)}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          disabled={startIndex === lastFrame && !infinite}
          onClick={() => moveRight(step)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
