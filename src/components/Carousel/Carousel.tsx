import { useEffect, useState } from 'react';
import './Carousel.scss';
import { State } from '../../types';

export const Carousel = ({
  images, step, frameSize, itemWidth, animationDuration, infinite,
}: State) => {
  const [imgPosition, setImgPosition] = useState(0);
  const lastImgPosition = images.length - frameSize;

  const carouselStyle = {
    width: `${itemWidth * frameSize}px`,
    transition: `${animationDuration}ms steps(5, end)`,
  };

  const carouselItemStyle = {
    transform: `translateX(${-(imgPosition * itemWidth)}px)`,
    transition: `${animationDuration}ms steps(6, jump-both)`,
  };

  const isNextDisabled = imgPosition === lastImgPosition && !infinite;
  const isPrevDisabled = imgPosition === 0 && !infinite;

  const handleNext = () => {
    if (imgPosition < lastImgPosition) {
      setImgPosition(previousImgPosition => (
        previousImgPosition + step <= lastImgPosition
          ? previousImgPosition + step
          : lastImgPosition
      ));
    } else {
      setImgPosition(0);
    }
  };

  const handlePrev = () => {
    if (imgPosition > 0) {
      setImgPosition(previousImgPosition => (
        previousImgPosition - step >= 0
          ? previousImgPosition - step
          : 0
      ));
    } else {
      setImgPosition(lastImgPosition);
    }
  };

  useEffect(() => setImgPosition(0), [frameSize]);

  return (
    <div className="Carousel" style={carouselStyle}>
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li key={image} style={carouselItemStyle}>
            <img
              src={image}
              width={itemWidth}
              alt={`${index + 1}`}
            />
          </li>
        ))}
      </ul>
      <div className="Carousel__wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          data-cy="next"
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};
