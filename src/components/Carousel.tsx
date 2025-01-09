import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [shift, setShift] = useState(0);
  const isPrevDisabled = shift === 0;
  const isNextDisabled = shift <= -itemWidth * (images.length - frameSize);

  const handlePrevClick = () => {
    if (shift < 0) {
      setShift(Math.min(0, shift + step * itemWidth));
    }
  };

  const handleNextClick = () => {
    setShift(
      Math.max(
        -itemWidth * images.length + frameSize * itemWidth,
        shift - step * itemWidth,
      ),
    );
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={index}
            className="Carousel__item"
            style={{
              height: `${itemWidth}px`,
              transform: `translateX(${shift}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              width={itemWidth}
              height={itemWidth}
            />
          </li>
        ))}
      </ul>

      <button
        className="button"
        type="button"
        disabled={isPrevDisabled}
        onClick={handlePrevClick}
      >
        &#8592;
      </button>
      <button
        className="button"
        data-cy="next"
        type="button"
        disabled={isNextDisabled}
        onClick={handleNextClick}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
