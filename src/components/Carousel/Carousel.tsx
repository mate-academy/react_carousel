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
  const [imgIndex, setImgIndex] = useState(0);

  const minImgIndex = 0;
  const maxImgIndex = images.length - frameSize;

  const containerWidth = frameSize * itemWidth;

  useEffect(() => {
    if (imgIndex > maxImgIndex) {
      setImgIndex(maxImgIndex);
    }

    if (imgIndex < minImgIndex) {
      setImgIndex(minImgIndex);
    }
  }, [frameSize]);

  const position = -(itemWidth * imgIndex);

  const handleNextButton = () => {
    setImgIndex(prevIndex => {
      if (infinite && prevIndex === maxImgIndex) {
        return minImgIndex;
      }

      const currentIndex = prevIndex + step;

      return Math.min(maxImgIndex, currentIndex);
    });
  };

  const handlePrevButton = () => {
    setImgIndex(prevIndex => {
      if (infinite && prevIndex === minImgIndex) {
        return maxImgIndex;
      }

      const currentIndex = prevIndex - step;

      return Math.max(minImgIndex, currentIndex);
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
        {images.map((image, index) => (
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
