import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const { 0: position, 1: setPosition } = useState(0);

  const preparedImages = images;
  const containerWidth = frameSize * itemWidth;
  const translate = itemWidth * step;

  useEffect(() => {
    setPosition(prevPosition => {
      const maxPosition = -((images.length - frameSize) * itemWidth);
      const minPosition = 0;

      if (infinite && prevPosition === minPosition) {
        return maxPosition;
      }

      return Math.min(minPosition, prevPosition + translate);
    });
  }, [itemWidth, frameSize, infinite]);

  const handleNextButton = () => {
    setPosition(prevPosition => {
      const maxPosition = -((images.length - frameSize) * itemWidth);
      const minPosition = 0;

      if (infinite && prevPosition === maxPosition) {
        return minPosition;
      }

      return Math.max(maxPosition, prevPosition - translate);
    });
  };

  const handlePrevButton = () => {
    setPosition(prevPosition => {
      const maxPosition = -((images.length - frameSize) * itemWidth);
      const minPosition = 0;

      if (infinite && prevPosition === minPosition) {
        return maxPosition;
      }

      return Math.min(minPosition, prevPosition + translate);
    });
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${containerWidth - 1}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(${position}px)`,
          transition: `${animationDuration}ms`,
        }}
      >
        {preparedImages.map((image, index) => (
          <li key={image}>
            <img
              src={image}
              alt={`${index + 1}`}
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
              className="Carousel__img"
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrevButton}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__button"
          onClick={handleNextButton}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
