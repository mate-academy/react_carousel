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
  const [visibleItems, setVisibleItems] = useState(0);

  const maxItems = (images.length - frameSize) * itemWidth;

  const handlePrevButton = () => {
    setVisibleItems(Math.min(visibleItems + itemWidth * step, 0));

    if (visibleItems === 0) {
      setVisibleItems(maxItems);
    }
  };

  const handleNextButton = () => {
    setVisibleItems(Math.max(visibleItems - itemWidth * step, -maxItems));

    if (visibleItems === -maxItems && infinite) {
      setVisibleItems(0);
    }
  };

  const frameWith = frameSize * itemWidth;

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{ width: `${frameWith}px` }}
      >
        {images.map((image) => (
          <li
            key={image}
            style={{
              transform: `translateX(${visibleItems}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${image}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          type="button"
          className="button"
          onClick={handlePrevButton}
          disabled={!visibleItems}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          className="button"
          onClick={handleNextButton}
          disabled={visibleItems === -maxItems && !infinite}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
