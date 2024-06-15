import React, { useState, CSSProperties } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState<number>(0);

  const totalItemsWidth: number = itemWidth * images.length;
  const maxPosition: number = -totalItemsWidth + frameSize * itemWidth;
  const isNextButtonDisabled: boolean = position <= maxPosition;

  const showNextImages = (): void => {
    setPosition(prevPosition => {
      const newPosition: number = prevPosition - step * itemWidth;

      return newPosition <= maxPosition ? maxPosition : newPosition;
    });
  };

  const showPrevImages = (): void => {
    setPosition(prevPosition => {
      const newPosition: number = prevPosition + step * itemWidth;

      return newPosition >= 0 ? 0 : newPosition;
    });
  };

  const containerWidth: number = frameSize * itemWidth + (frameSize - 1) * 2;

  const containerStyle: CSSProperties = { width: containerWidth };
  const listStyle: CSSProperties = {
    transform: `translateX(${position}px)`,
    transition: `transform ${animationDuration}ms ease`,
  };
  const buttonsWrapperStyle: CSSProperties = {
    width: `${frameSize * itemWidth}px`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons-wrapper" style={buttonsWrapperStyle}>
        <button
          type="button"
          className="Carousel__button"
          disabled={position === 0}
          onClick={showPrevImages}
        >
          &lt;
        </button>
        <button
          data-cy="next"
          type="button"
          className="Carousel__button"
          disabled={isNextButtonDisabled}
          onClick={showNextImages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
