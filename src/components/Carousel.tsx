import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);
  const handleNext = () => {
    setPosition(prev => Math.min(prev + step, images.length - frameSize));
  };

  const handlePrev = () => {
    setPosition(prev => Math.max(prev - step, 0));
  };

  return (
    <div className="Carousel">
      <button type="button" onClick={handlePrev} disabled={position === 0}>
        Prev
      </button>
      <div
        className="Carousel__container"
        style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
            width: `${images.length * itemWidth}px`,
          }}
        >
          {images.map((image, i) => (
            <li key={i}>
              <img
                src={image}
                alt={`image ${i}`}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={handleNext}
        disabled={position >= images.length - frameSize}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
