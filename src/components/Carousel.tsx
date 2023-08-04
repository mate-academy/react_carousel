import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinity,
}) => {
  const [offset, setOffset] = useState(0);

  const handlePrevClick = (prev: number) => {
    if (prev >= 0 && infinity) {
      return -(itemWidth * images.length) + itemWidth * frameSize;
    }

    if (prev < -(itemWidth * step)) {
      return prev + step * itemWidth;
    }

    return 0;
  };

  const handleNextClick = (prev: number) => {
    if (prev <= -(images.length * itemWidth) + itemWidth * frameSize
      && infinity
    ) {
      return 0;
    }

    if (prev <= -(images.length * itemWidth) + itemWidth * (frameSize + step)) {
      return -(images.length * itemWidth) + itemWidth * frameSize;
    }

    if (prev >= -(images.length * itemWidth) + itemWidth * frameSize) {
      return prev - itemWidth * step;
    }

    return 0;
  };

  return (
    <div
      className="Carousel"
      style={{
        width: itemWidth * frameSize,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${offset}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map(image => (
          <li
            key={image}
          >
            <img
              src={image}
              alt="img"
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => (
          setOffset(handlePrevClick)
        )}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={() => (
          setOffset(handleNextClick)
        )}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
