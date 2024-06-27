import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [position, setPosition] = useState(0);

  const lastImagePosition = -(images.length - frameSize);

  const handlePrevImage = () => {
    if (position < 0) {
      setPosition(prevPosition =>
        prevPosition + step < 0 ? prevPosition + step : 0,
      );

      return;
    }

    setPosition(lastImagePosition);
  };

  const handleNextImage = () => {
    if (position > lastImagePosition) {
      setPosition(prevPosition =>
        prevPosition - step > lastImagePosition
          ? prevPosition - step
          : lastImagePosition,
      );

      return;
    }

    setPosition(0);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(${position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              className="Carousel__image"
              src={image}
              alt={image}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevImage}
          disabled={!position && !infinite}
        >
          Prev
        </button>
        <button
          type="button"
          className="Carousel__button"
          data-cy="next"
          onClick={handleNextImage}
          disabled={position === lastImagePosition && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
