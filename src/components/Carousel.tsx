import React, { useState } from 'react';
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
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);
  const visibleIndex = Math.min(imageIndex, maxIndex);
  const horizontalMove = itemWidth * visibleIndex * -1;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${horizontalMove}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt={image.match(/\d+/)?.[0] ?? ''}
                width={itemWidth}
                style={{
                  aspectRatio: '1 / 1',
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        disabled={visibleIndex === 0}
        onClick={() => {
          setImageIndex(prevIndex => {
            const currentIndex = Math.min(prevIndex, maxIndex);

            if (currentIndex - step >= 0) {
              return currentIndex - step;
            }

            return 0;
          });
        }}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        disabled={visibleIndex === maxIndex}
        onClick={() => {
          setImageIndex(prevIndex => {
            const currentIndex = Math.min(prevIndex, maxIndex);

            if (currentIndex + step <= maxIndex) {
              return currentIndex + step;
            }

            return maxIndex;
          });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
