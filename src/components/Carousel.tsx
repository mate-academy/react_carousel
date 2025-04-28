import React, { useState } from 'react';
import './Carousel.scss';
interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex !== images.length - frameSize || infinite) {
      setStartIndex(prevIndex => {
        if (prevIndex + 1 > images.length - frameSize) {
          return 0;
        }

        return Math.min(prevIndex + step, images.length - frameSize);
      });
    }
  };

  const handlePrev = () => {
    if (startIndex !== 0 || infinite) {
      setStartIndex(prevIndex => {
        if (prevIndex === 0) {
          return images.length - 1;
        }

        return Math.max(prevIndex - step, 0);
      });
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: itemWidth * frameSize,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${startIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`image ${index}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__controls">
        <button
          className="Carousel__controls--button"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && startIndex === 0}
        >
          Prev
        </button>
        <button
          className="Carousel__controls--button"
          data-cy="next"
          type="button"
          onClick={handleNext}
          disabled={!infinite && startIndex === images.length - frameSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
