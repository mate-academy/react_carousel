import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [listPosition, setListPosition] = useState(0);

  const handlePrev = () => {
    const newPosition = listPosition - itemWidth * step;

    setListPosition(
      newPosition < 0
        ? (images.length - frameSize) * itemWidth
        : newPosition,
    );
  };

  const handleNext = () => {
    const remainingImages = images.length - Math.ceil(listPosition / itemWidth);
    let newPosition;

    if (remainingImages < step) {
      newPosition = 0;
    } else {
      newPosition = listPosition + itemWidth * step;
      newPosition = newPosition >= images.length
      * itemWidth ? 0 : newPosition;
    }

    setListPosition(newPosition);
  };

  const carouselContainerStyles = {
    width: `${itemWidth * frameSize}px`,
    transitionDuration: `${animationDuration}ms`,
    overflow: 'hidden',
  };

  const carouselListStyles = {
    width: `${itemWidth * images.length}px`,
    height: `${itemWidth}px`,
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${listPosition}px)`,
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

      <button type="button" onClick={handlePrev}>
        &lt; Prev
      </button>
      <button type="button" onClick={handleNext} data-cy="next">
        Next &gt;
      </button>
    </div>
  );
};
