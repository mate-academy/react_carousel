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
  const [currentShift, setCurrentShift] = useState(0);

  const widthOfListBox = itemWidth * frameSize;
  const hiddenImagesLength = (images.length - frameSize) * itemWidth;

  const getPrevImage = () => {
    setCurrentShift((shift) => Math.min(shift + itemWidth * step, 0));
  };

  const getNextImage = () => {
    if (currentShift === -hiddenImagesLength && infinite) {
      setCurrentShift(0);
    }

    setCurrentShift((shift) => Math.max(
      shift - itemWidth * step,
      -hiddenImagesLength,
    ));
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${widthOfListBox}px` }}
      >
        {images.map((img, ind) => (
          <li
            key={img}
            style={{
              transform: `translateX(${currentShift}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={`${ind + 1}`}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons-wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={getPrevImage}
          disabled={currentShift === 0}
        >
          &#9664;
        </button>
        <button
          className="Carousel__button"
          data-cy="next"
          type="button"
          onClick={getNextImage}
          disabled={currentShift === -hiddenImagesLength && !infinite}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
