import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
  handleChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - frameSize;
  const minIndex = 0;

  return (
    <div
      className="Carousel"
      style={{
        width: itemWidth * frameSize,
      }}
    >
      <label htmlFor="itemId">ItemWidth:</label>
      <input
        id="itemId"
        type="number"
        name="itemWidth"
        value={itemWidth}
        onChange={handleChange}
      />

      <label htmlFor="frameId">FrameSize:</label>
      <input
        id="frameId"
        type="number"
        name="frameSize"
        value={frameSize}
        onChange={handleChange}
      />

      <label htmlFor="stepId">Step:</label>
      <input
        id="stepId"
        type="number"
        name="step"
        value={step}
        onChange={handleChange}
      />

      <label htmlFor="animationDuration">AnimationDuration:</label>
      <input
        id="animationDuration"
        type="number"
        name="animationDuration"
        value={animationDuration}
        onChange={handleChange}
      />

      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`image ${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        data-cy="prev"
        type="button"
        onClick={() => {
          if (infinite && currentIndex === minIndex) {
            setCurrentIndex(maxIndex);
          } else {
            setCurrentIndex(Math.max(currentIndex - step, minIndex));
          }
        }}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={() => {
          if (infinite && currentIndex === maxIndex) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(Math.min(currentIndex + step, maxIndex));
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
