import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  frameSize?: number;
  itemWidth?: number | string;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const numericItemWidth =
    typeof itemWidth === 'number' ? itemWidth : parseInt(itemWidth, 10) || 130;

  const frameWidth = numericItemWidth * frameSize;
  const [currentIndex, setCurrentIndex] = useState(0);
  const offset = currentIndex * numericItemWidth;

  const handleNextClick = () => {
    if (infinite) {
      setCurrentIndex(prev => (prev + step >= images.length ? 0 : prev + step));
    } else {
      setCurrentIndex(prev => Math.min(prev + step, images.length - frameSize));
    }
  };

  const handlePrevClick = () => {
    if (infinite) {
      setCurrentIndex(prev =>
        prev - step < 0 ? images.length - frameSize : prev - step,
      );
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__wrapper">
        <button
          className="Carousel__button"
          type="button"
          onClick={handlePrevClick}
          disabled={!infinite && currentIndex === 0}
        >
          &lsaquo;
        </button>

        <div
          className="Carousel__frame"
          style={{ width: `${frameWidth}px`, overflow: 'hidden' }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: `transform ${animationDuration / 1000}s ease`,
              display: 'flex',
              padding: 0,
            }}
          >
            {images.map((image, index) => (
              <li key={index} style={{ width: `${itemWidth}px` }}>
                <img
                  src={image}
                  width={itemWidth}
                  height={itemWidth}
                  style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
                  alt={`image ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNextClick}
          disabled={!infinite && currentIndex >= images.length - frameSize}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
