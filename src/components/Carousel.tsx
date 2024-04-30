import { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  stepSize: number;
  animationDur: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  stepSize,
  animationDur,
  infinite,
}) => {
  const frameWidth = frameSize * itemWidth;
  const [position, setPosition] = useState(0);

  function firstDisabled() {
    if (infinite) {
      return false;
    }

    if (position === 0) {
      return true;
    }

    return false;
  }

  function secondDisabled() {
    if (infinite) {
      return false;
    }

    if (position === -itemWidth * (images.length - frameSize)) {
      return true;
    }

    return false;
  }

  const isFirstDisabled = firstDisabled();
  const isSecondDisabled = secondDisabled();
  const lastPosition = Math.max(0, (images.length - stepSize) * itemWidth);
  const prevPosition = () => {
    if (infinite && position === 0) {
      setPosition(-lastPosition);
    } else {
      setPosition(prev => Math.min(prev + itemWidth * stepSize, 0));
    }
  };

  const nextPosition = () => {
    if (infinite && position === -lastPosition) {
      setPosition(0);
    } else {
      setPosition(prev =>
        Math.max(
          prev - itemWidth * stepSize,
          -itemWidth * (images.length - frameSize),
        ),
      );
    }
  };

  return (
    <div className="Carousel" style={{ width: frameWidth }}>
      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`${index}`}
              style={{
                width: itemWidth,
                transform: `translateX(${position}px)`,
                transition: `${animationDur}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={prevPosition}
          disabled={isFirstDisabled}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={nextPosition}
          disabled={isSecondDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
