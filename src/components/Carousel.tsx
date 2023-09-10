import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images, frameSize, itemWidth, animationDuration, step, infinite,
}) => {
  const [position, setPosition] = useState(0);
  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
    'transition-duration': `${animationDuration}ms`,
    transform: `translateX(-${position * itemWidth}px)`,
  };
  const containerStyle = {
    width: `${itemWidth * frameSize}px`,
  };

  const handlerNext = () => {
    setPosition(prevPosition => {
      switch (true) {
        case infinite && prevPosition === images.length - frameSize:
          return 0;
        case prevPosition + step > images.length - frameSize:
          return images.length - frameSize;
        default:
          return prevPosition + step;
      }
    });
  };

  const handlerPrev = () => {
    setPosition(prevPosition => {
      switch (true) {
        case infinite && prevPosition === 0:
          return images.length - frameSize;
        case prevPosition - step < 0:
          return 0;
        default:
          return prevPosition - step;
      }
    });
  };

  return (
    <div className="Carousel">
      {infinite}
      <div className="container" style={containerStyle}>
        <div className="images">
          {images.map((image, index) => (
            <img
              style={imageStyle}
              src={image}
              alt={`${index}`}
            />
          ))}
        </div>
        <div className="buttons">
          <button
            disabled={position === 0 && !infinite}
            className="arrow"
            type="button"
            onClick={handlerPrev}
          >
            {}
          </button>
          <button
            disabled={position === images.length - frameSize && !infinite}
            className="arrow arrow--right"
            type="button"
            onClick={handlerNext}
            data-cy="next"
          >
            {}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
