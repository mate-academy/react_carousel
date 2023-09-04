/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  imageWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const GAP = 25;

export const Carousel: React.FC<Props> = ({
  images,
  imageWidth,
  frameSize,
  step,
  animationDuration,
  infinite = false,
}) => {
  const containerWidth = (imageWidth + GAP) * frameSize;
  const totalWidth = (imageWidth + GAP) * images.length;
  const maxOffset = -(totalWidth - containerWidth);

  const [currentOffset, setCurrentOffset] = useState(0);

  const moveLeft = () => {
    let newOffset = currentOffset - (imageWidth + GAP) * step;

    if (infinite && newOffset < maxOffset) {
      newOffset = maxOffset;
    }

    setCurrentOffset(newOffset);
  };

  const moveRight = () => {
    let newOffset = currentOffset + (imageWidth + GAP) * step;

    if (infinite && newOffset > 0) {
      newOffset = 0;
    }

    setCurrentOffset(newOffset);
  };

  return (
    // eslint-disable-next-line react/jsx-indent
    <div className="Carousel" style={{ width: `${containerWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          width: `${totalWidth}px`,
          marginLeft: `${currentOffset}px`,
          transition: `margin-left ${animationDuration / 1000}s ease-in-out`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: `${imageWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        title="prevButton"
        type="button"
        onClick={() => {
          if (currentOffset > maxOffset) {
            moveLeft();
          }
        }}
        disabled={currentOffset <= maxOffset}
      >
        {' ← '}
      </button>
      <button
        data-cy="next"
        title="nextButton"
        type="button"
        onClick={() => {
          if (currentOffset < 0) {
            moveRight();
          }
        }}
        disabled={currentOffset >= 0}
      >
        {' → '}
      </button>
    </div>
  );
};
