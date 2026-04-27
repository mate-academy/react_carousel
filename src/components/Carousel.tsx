import React, { useState } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  function handleNext() {
    setPosition(
      infinite && position >= images.length - frameSize
        ? 0
        : Math.min(position + step, images.length - frameSize),
    );
  }

  function handlePrev() {
    setPosition(
      infinite && position === 0
        ? images.length - frameSize
        : Math.max(position - step, 0),
    );
  }

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${-(position * itemWidth)}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={String(index)} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        disabled={position === 0 && !infinite}
        type="button"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        disabled={position === images.length - frameSize && !infinite}
        data-cy="next"
        type="button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
