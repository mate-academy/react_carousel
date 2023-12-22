import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [moveItems, setMoveItems] = useState(0);

  const lastItem = images.length - frameSize;
  const isDisabledNext = moveItems === lastItem && !infinite;
  const isDisabledPrev = moveItems === 0 && !infinite;

  const carouselStyle = {
    width: `${itemWidth * frameSize}px`,
  };

  const imgStyle = {
    transform: `translateX(${-(moveItems * itemWidth)}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const handleMovePrev = () => {
    if (moveItems > 0) {
      setMoveItems((prev) => (prev - step >= 0 ? prev - step : 0));
    } else {
      setMoveItems(lastItem);
    }
  };

  const handleMoveNext = () => {
    if (moveItems < lastItem) {
      setMoveItems((prev) => (prev + step <= lastItem
        ? prev + step
        : lastItem));
    } else {
      setMoveItems(0);
    }
  };

  return (
    <div className="Carousel" style={carouselStyle}>
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li
            key={image}
            className="Carousel__item"
            style={imgStyle}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          onClick={handleMovePrev}
          type="button"
          disabled={isDisabledPrev}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          onClick={handleMoveNext}
          type="button"
          data-cy="next"
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
