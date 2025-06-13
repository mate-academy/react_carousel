import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: string;
  animation: number;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  step,
  itemWidth,
  animation,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const numericWidth = parseInt(itemWidth, 10);
  const maxIndex = images.length - frameSize;

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - step, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + step, maxIndex));
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${numericWidth * frameSize}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${startIndex * numericWidth}px)`,
          width: `${images.length * numericWidth}px`,
          transition: `transform ${animation}ms ease`,
        }}
      >
        {images.map((img, i) => (
          <li key={img}>
            <img
              src={img}
              alt={`img-${i}`}
              style={{
                width: itemWidth,
                display: 'block',
              }}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
