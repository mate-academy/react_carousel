import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  step,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [offset, setOffset] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const maxOffset = (images.length - frameSize) * itemWidth;

  const handleNext = () => {
    setOffset(prev => {
      if (infinite && hasReachedEnd) {
        setHasReachedEnd(false);

        return 0;
      }

      const newOffset = Math.min(prev + step * itemWidth, maxOffset);

      if (newOffset === maxOffset && infinite) {
        setHasReachedEnd(true);
      }

      return newOffset;
    });
  };

  const handlePrev = () => {
    setOffset(prev => {
      if (infinite && prev === 0) {
        setHasReachedEnd(true);

        return maxOffset;
      }

      const newOffset = Math.max(prev - step * itemWidth, 0);

      if (infinite) {
        setHasReachedEnd(false);
      }

      return newOffset;
    });
  };

  const imageList = images.map(img => {
    const name = img.match(/\/(\d+)\.png$/)?.[1] || 'unknown';

    return (
      <li key={name}>
        <img
          src={img}
          alt={name}
          className="Carousel__list-item"
          width={itemWidth}
          height={itemWidth}
        />
      </li>
    );
  });

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: `${animationDuration}ms`,
        }}
      >
        {imageList}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button Carousel__button--prev"
          type="button"
          onClick={handlePrev}
          disabled={!infinite && offset === 0}
        >
          Prev
        </button>
        <button
          className="Carousel__button Carousel__button--next"
          type="button"
          data-cy="next"
          onClick={handleNext}
          disabled={!infinite && offset === maxOffset}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
