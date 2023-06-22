import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: Array<string>,
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [offset, setOffset] = useState(0);

  const handlePrevClick = () => {
    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    setOffset(Math.min(offset + itemWidth * step, 0));

    if (offset === 0 && infinite) {
      setOffset(-hiddenImagesSize);
    }
  };

  const handleNextClick = () => {
    const hiddenImagesSize = (images.length - frameSize) * itemWidth;

    setOffset(Math.max(offset - itemWidth * step, -hiddenImagesSize));

    if (offset === -hiddenImagesSize && infinite) {
      setOffset(0);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${frameSize * itemWidth}px` }}
      >
        {images.map((image, index) => (
          <li
            className="Carousel__item"
            key={image}
            style={{
              transform: `translateX(${offset}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${index + 1}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={offset === 0 && !infinite}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={handleNextClick}
          disabled={
            offset === -(images.length - frameSize) * itemWidth && !infinite
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
