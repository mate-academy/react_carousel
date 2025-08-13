import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const safeFrameSize = Math.max(1, frameSize);
  const safeStep = Math.max(1, step);

  const [offset, setOffset] = useState(0);
  const frameWidth = safeFrameSize * itemWidth;

  const canScroll = images.length > safeFrameSize;
  const maxOffset = (images.length - safeFrameSize) * itemWidth;
  const isPrevDisabled = !canScroll || (!infinite && offset === 0);
  const isNextDisabled = !canScroll || (!infinite && offset >= maxOffset);

  useEffect(() => {
    if (offset > maxOffset) {
      setOffset(maxOffset);
    }
  }, [images, safeFrameSize, itemWidth, offset, maxOffset]);

  const handleNextClick = () => {
    const newOffset = offset + safeStep * itemWidth;

    if (infinite) {
      setOffset(newOffset > maxOffset ? 0 : newOffset);
    } else {
      setOffset(Math.min(newOffset, maxOffset));
    }
  };

  const handlePrevClick = () => {
    const newOffset = offset - safeStep * itemWidth;

    if (infinite) {
      setOffset(newOffset < 0 ? maxOffset : newOffset);
    } else {
      setOffset(Math.max(newOffset, 0));
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel-frame" style={{ width: `${frameWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((imageUrl, index) => (
            <li
              key={index}
              className="carousel-item"
              style={{ width: `${itemWidth}px` }}
            >
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrevClick} disabled={isPrevDisabled}>
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNextClick}
        disabled={isNextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
