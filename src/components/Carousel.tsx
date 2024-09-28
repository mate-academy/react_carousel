import React, { useState } from 'react';
import './Carousel.scss';

// it will be used also in App file
export type IProps = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

export const Carousel: React.FC<IProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  // index defines how much items we scroll at once
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      // if we try to scroll to the left more than images left, it will jump to the end
      prevIndex - step < 0 ? images.length - step : prevIndex - step,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      // trying scroll to the right more than images left than you return to the beginning
      prevIndex + step >= images.length ? 0 : prevIndex + step,
    );
  };

  return (
    <div
      className="Carousel"
      style={{
        // width of the outer container has to be exact the same as visible items otherwise it doesn't work :(
        width: `${itemWidth * frameSize}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          // and that's where we need index
          transform: `translateX(-${currentIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((img, i) => (
          <li key={img}>
            <img src={img} alt={`${i} + 1`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button type="button" data-cy="prev" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
