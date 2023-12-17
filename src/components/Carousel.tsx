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
  const [offsetX, setOffsetX] = useState(0);
  const maxOffSet = images.length * itemWidth * -1 + frameSize * itemWidth;
  const isDisabledButtonPre = offsetX === 0;
  const isDisabledButtonNext = offsetX === maxOffSet;
  const movieNext = () => {
    const nextOffSet = offsetX - step * itemWidth;

    if (nextOffSet > maxOffSet) {
      setOffsetX(nextOffSet);
    } else {
      setOffsetX(maxOffSet);
    }
  };

  const moviePrevious = () => {
    const prevOffSet = offsetX + itemWidth * step;

    if (prevOffSet <= 0) {
      setOffsetX(prevOffSet);
    } else {
      setOffsetX(0);
    }
  };

  return (
    <>
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {images.map((image: string) => (
          <img
            src={image}
            alt="qwe"
            key={image}
            style={{
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
              transform: `translate(${offsetX}px, 0px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          />
        ))}

      </div>
      <div className="Carousel_AllButton">
        <button
          className="Carousel_button"
          type="button"
          onClick={moviePrevious}
          disabled={isDisabledButtonPre}
        >
          Prev
        </button>
        <button
          className="Carousel_button"
          data-cy="next"
          type="button"
          onClick={movieNext}
          disabled={isDisabledButtonNext}
        >
          Next
        </button>

      </div>
    </>
  );
};

export default Carousel;
