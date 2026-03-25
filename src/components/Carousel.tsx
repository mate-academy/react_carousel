import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel: React.FC<CarouselType> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleNext = () => {
    if (infinite && visibleIndex >= images.length - frameSize) {
      setVisibleIndex(0);
    } else {
      setVisibleIndex(Math.min(images.length - frameSize, visibleIndex + step));
    }
  };

  const handlePrev = () => {
    if (infinite && visibleIndex === 0) {
      setVisibleIndex(Math.max(0, images.length - frameSize));
    } else {
      setVisibleIndex(Math.max(0, visibleIndex - step));
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrev}
        disabled={!infinite && visibleIndex === 0}
      >
        Prev
      </button>

      <div
        style={{
          overflow: 'hidden',
          width: frameSize * itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: images.length * itemWidth,
            transform: `translateX(${visibleIndex * itemWidth * -1}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={index} style={{ width: itemWidth }}>
              <img
                src={image}
                alt={`image-${index}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={!infinite && visibleIndex >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};
