import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);

  const handleNext = () => {
    setIndex(prev => Math.min(prev + step, maxIndex));
  };

  const handlePrev = () => {
    setIndex(prev => Math.max(prev - step, 0));
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${index * (itemWidth + 10)}px)`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        }}
      >
        {images.map((image, i) => (
          <li key={i}>
            <img src={image} alt={`${i}`} width={itemWidth} />
          </li>
        ))}
      </ul>
      <div className="sectionBtn">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          type="button"
          className="sectionBtn__button"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={index >= maxIndex}
          data-cy="next"
          type="button"
          className="sectionBtn__button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
