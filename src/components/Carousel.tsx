import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [imgPosition, setImgPosition] = useState(0);

  const lastImgPosition = images.length - frameSize;
  const isDisabledNext = imgPosition === lastImgPosition && !infinite;
  const isDisabledPrev = imgPosition === 0 && !infinite;

  const carouselStyle = {
    width: `${itemWidth * frameSize}px`,
  };

  const carouselImageStyle = {
    transform: `translateX(${-(imgPosition * itemWidth)}px)`,
    transition: `transform ${animationDuration}ms ease`,
  };

  const handlePrev = () => {
    if (imgPosition > 0) {
      setImgPosition(prev => (
        prev - step >= 0
          ? prev - step
          : 0
      ));
    } else {
      setImgPosition(lastImgPosition);
    }
  };

  const handleNext = () => {
    if (imgPosition < lastImgPosition) {
      setImgPosition(prev => (
        prev + step <= lastImgPosition
          ? prev + step
          : lastImgPosition
      ));
    } else {
      setImgPosition(0);
    }
  };

  return (
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
          onClick={handlePrev}
          type="button"
          disabled={isDisabledPrev}
        >
          Prev
        </button>

        <button
          onClick={handleNext}
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
