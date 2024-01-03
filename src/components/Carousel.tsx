import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const lastImagePosition = images.length - frameSize;
  const isDisabledNext = scrollPosition === lastImagePosition && !infinite;
  const isDisabledPrev = scrollPosition === 0 && !infinite;

  const carouselStyle = {
    width: `${itemWidth * frameSize}px`,
  };

  const carouselImageStyle = {
    transform: `translateX(${-(scrollPosition * itemWidth)}px)`,
    transition: `transform ${animationDuration}ms ease`,
  };

  const handlePrevButton = () => {
    if (scrollPosition > 0) {
      setScrollPosition(prev => (
        prev - step >= 0
          ? prev - step
          : 0
      ));
    } else {
      setScrollPosition(lastImagePosition);
    }
  };

  const handleNextButton = () => {
    if (scrollPosition < lastImagePosition) {
      setScrollPosition(prev => (
        prev + step <= lastImagePosition
          ? prev + step
          : lastImagePosition
      ));
    } else {
      setScrollPosition(0);
    }
  };

  return (
    <>
      <div className="Carousel" style={carouselStyle}>
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              key={image}
              className="Carousel__item"
              style={carouselImageStyle}
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
            type="button"
            onClick={handlePrevButton}
            disabled={isDisabledPrev}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={handleNextButton}
            disabled={isDisabledNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
