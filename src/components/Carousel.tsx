import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  imagesArray: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  imagesArray,
  step,
  frameSize,
  itemWidth,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleNext = () => {
    const maxPosition = (imagesArray.length - frameSize) * itemWidth;

    if (infinite && currentPosition >= maxPosition) {
      setCurrentPosition(0);
    } else {
      const newPosition = Math.min(
        currentPosition + step * itemWidth,
        maxPosition,
      );

      setCurrentPosition(newPosition);
    }
  };

  const handlePrev = () => {
    if (infinite && currentPosition === 0) {
      const maxPosition = (imagesArray.length - frameSize) * itemWidth;

      setCurrentPosition(maxPosition);
    } else {
      const newPosition = Math.max(currentPosition - step * itemWidth, 0);

      setCurrentPosition(newPosition);
    }
  };

  return (
    <div className="Carousel" style={{ width: itemWidth * frameSize }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentPosition}px)`,
          transition: `transform ${animationDuration}ms ease`,
          width: imagesArray.length * itemWidth,
        }}
      >
        {imagesArray.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: itemWidth }}
              width={itemWidth}
              data-cy={`image-${index + 1}`}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
