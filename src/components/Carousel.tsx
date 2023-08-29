/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  // step: number;
  // animationDuration: number;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  // step = 3,
  // animationDuration = 1000,
}) => {
  const containerWidth = (itemWidth + 25) * frameSize;

  const [currentOffset, setCurrentOffset] = useState(0);
  const moveLeft = () => {
    setCurrentOffset(currentOffset - itemWidth);
  };

  const moveRight = () => {
    setCurrentOffset(currentOffset + itemWidth);
  };

  return (
    // eslint-disable-next-line react/jsx-indent
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${containerWidth}px`,
        }}
      >
        {images.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                width: `${itemWidth}px`,
                marginLeft: `${currentOffset}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        title="prevButton"
        type="button"
        onClick={moveLeft}
      >
        {' ← '}
      </button>
      <button
        data-cy="next"
        title="nextButton"
        type="button"
        onClick={moveRight}
      >
        {' → '}
      </button>
    </div>
  );
};
