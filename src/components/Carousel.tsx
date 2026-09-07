import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gap = 10;
  const visibleWidth = frameSize * itemWidth + (frameSize - 1) * gap;
  const maxIndex = Math.max(0, images.length - frameSize);
  const transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;

  useEffect(() => {
    setCurrentIndex(index => Math.min(index, maxIndex));
  }, [maxIndex]);

  return (
    <div className="Carousel" style={{ width: visibleWidth }}>
      <div className="Carousel__wrapper" style={{ width: visibleWidth }}>
        <ul
          className="Carousel__list"
          style={{
            transform,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => {
            const isVisible = index < currentIndex + frameSize;

            return (
              <li key={image} style={{ width: itemWidth }}>
                <img
                  src={image}
                  alt={image}
                  width={itemWidth}
                  style={{ visibility: isVisible ? 'visible' : 'hidden' }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        disabled={!infinite && currentIndex === 0}
        onClick={() => {
          setCurrentIndex(index =>
            index === 0 && infinite ? maxIndex : Math.max(0, index - step),
          );
        }}
      >
        &lt;
      </button>

      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        disabled={!infinite && currentIndex === maxIndex}
        onClick={() => {
          setCurrentIndex(index =>
            index === maxIndex && infinite
              ? 0
              : Math.min(maxIndex, index + step),
          );
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
