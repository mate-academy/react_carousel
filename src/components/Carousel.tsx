import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(
      prevIndex + step, images.length - frameSize,
    ));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - step, 0));
  };

  const visibleImages = images.slice(startIndex, startIndex + frameSize);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={{ transition: `${animationDuration}ms ease` }}>
        {visibleImages.map((img) => (
          <li key={img}>
            <img src={img} alt={img} style={{ width: `${itemWidth}px` }} />
          </li>
        ))}
      </ul>

      <div className="Container">
        <button
          type="button"
          disabled={startIndex === 0}
          onClick={handlePrev}
          data-cy="prev"
        >
          Prev
        </button>

        <button
          type="button"
          disabled={startIndex === images.length}
          onClick={handleNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
