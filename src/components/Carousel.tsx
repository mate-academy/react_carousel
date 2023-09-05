import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images, itemWidth, frameSize, step, animationDuration, infinite,
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const maxIndex = images.length - frameSize;

  const prevDisabled = (itemIndex <= 0) && !infinite;
  const nextDisabled = (itemIndex >= maxIndex) && !infinite;

  const handleNextClick = () => {
    if (infinite && itemIndex === maxIndex) {
      setItemIndex(0);
    } else {
      setItemIndex(Math.min(maxIndex, itemIndex + step));
    }
  };

  const handlePrevClick = () => {
    if (infinite && itemIndex === 0) {
      setItemIndex(maxIndex);
    } else {
      setItemIndex(Math.max(0, itemIndex - step));
    }
  };

  return (
    <div
      className="carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
        transition: `${animationDuration}ms`,
      }}
    >
      <ul className="carousel__list">
        {images.map((url, ind) => (
          <li
            key={url}
            style={{
              transform: `translateX(${-itemIndex * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              className="carousel__image"
              src={url}
              alt={`${ind + 1}`}
              style={{ width: itemWidth }}
            />
          </li>
        ))}
      </ul>

      <div className="carousel__buttons">
        <button
          type="button"
          className="carousel__button"
          disabled={prevDisabled}
          onClick={handlePrevClick}
        >
          &lt;
        </button>

        <button
          data-cy="next"
          type="button"
          className="carousel__button"
          disabled={nextDisabled}
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
