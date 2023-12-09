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

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [offSet, setOffSet] = useState(0);

  const maxOffSet = images.length - frameSize;
  const isDisabledLeft = offSet === 0 && !infinite;
  const isDisabledRight = offSet === maxOffSet && !infinite;

  const hadleLeft = () => {
    return (
      offSet !== 0
        ? setOffSet(offSet - step >= 0
          ? offSet - step
          : 0)
        : setOffSet(maxOffSet)
    );
  };

  const hadleRight = () => {
    return (
      offSet !== maxOffSet
        ? setOffSet(offSet + step <= maxOffSet
          ? offSet + step
          : maxOffSet)
        : setOffSet(0)
    );
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__window"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-(offSet * itemWidth)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(((image, i) => (
            <li
              className="Carousel__element"
              key={image}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={`${i + 1}`}
                style={{
                  height: `${itemWidth}px`,
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          )))}
        </ul>
      </div>

      <div className="Carousel__menu">
        <button
          className="Carousel__button left"
          type="button"
          onClick={hadleLeft}
          disabled={isDisabledLeft}
        >
          Prev
        </button>

        <button
          data-cy="next"
          className="Carousel__button right"
          type="button"
          onClick={hadleRight}
          disabled={isDisabledRight}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
