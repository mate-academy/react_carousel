import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);

  const lastPosition = -(images.length - frameSize);

  const isPrevDisabled = !position;
  const isNextDisabled = position === lastPosition;

  const handleNextClick = () => {
    if (position > lastPosition) {
      setPosition(prevPosition =>
        prevPosition - step > lastPosition ? prevPosition - step : lastPosition,
      );

      return;
    }

    setPosition(0);
  };

  const handlePrevClick = () => {
    if (position < 0) {
      setPosition(prevPosition =>
        prevPosition + step < 0 ? prevPosition + step : 0,
      );

      return;
    }

    setPosition(0);
  };

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          width: `${frameSize * itemWidth}px`,
          transform: `translateX(${position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map(image => (
          <li>
            <img
              style={{
                width: `${itemWidth}px`,
              }}
              key={image}
              src={image}
              alt={`${image.slice(6, 7)}`}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          disabled={isPrevDisabled}
          onClick={handlePrevClick}
        >
          Prev
        </button>

        <button
          data-cy="next"
          className="Carousel__button"
          type="button"
          disabled={isNextDisabled}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
