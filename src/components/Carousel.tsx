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
  const [currentPosition, setCurrentPosition] = useState(0);

  const handlePrevClick = () => {
    const newPosition = currentPosition - itemWidth * step;

    if (infinite) {
      setCurrentPosition(
        newPosition < 0
          ? (images.length - frameSize) * itemWidth
          : newPosition,
      );
    } else {
      setCurrentPosition(Math.max(newPosition, 0));
    }
  };

  const handleNextClick = () => {
    const remainingImages = images.length
    - Math.ceil(currentPosition / itemWidth);

    let newPosition;

    if (infinite) {
      if (remainingImages < step) {
        newPosition = 0;
      } else {
        newPosition = currentPosition + itemWidth * step;
        newPosition
        = newPosition >= images.length * itemWidth
            ? 0
            : newPosition;
      }
    } else {
      newPosition = currentPosition + itemWidth * step;
      newPosition = Math.min(
        newPosition,
        (images.length - frameSize) * itemWidth,
      );
    }

    setCurrentPosition(newPosition);
  };

  const carouselContainerStyles = {
    width: `${itemWidth * frameSize}px`,
    transitionDuration: `${animationDuration}ms`,
  };

  const carouselListStyles = {
    width: `${itemWidth * images.length}px`,
    height: `${itemWidth}px`,
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${currentPosition}px)`,
  };

  const carouselWrapperStyles = {
    width: `${itemWidth * frameSize}px`,
  };

  return (
    <div className="Carousel" style={carouselContainerStyles}>
      <div className="Carousel__wrapper" style={carouselWrapperStyles}>
        <ul className="Carousel__list" style={carouselListStyles}>
          {images.map((image: string, index: number) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={`${index}`}
                width={itemWidth}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          className="Carousel__btn"
          type="button"
          onClick={handlePrevClick}
          disabled={!infinite && currentPosition === 0}
        >
          &lt;
        </button>
        <button
          className="Carousel__btn"
          type="button"
          onClick={handleNextClick}
          data-cy="next"
          disabled={
            !infinite
              && currentPosition >= (itemWidth * (images.length - frameSize))
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
