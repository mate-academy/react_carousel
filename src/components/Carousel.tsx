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
  infinite = false,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const windowWidth = frameSize * itemWidth;
  const translateX = -imageIndex * itemWidth;
  const handleNext = () => {
    if (imageIndex + step > images.length - frameSize) {
      if (!infinite) {
        return setImageIndex(images.length - frameSize);
      } else {
        return setImageIndex(0);
      }
    }

    return setImageIndex(imageIndex + step);
  };

  const handlePrev = () => {
    if (imageIndex - step < 0) {
      if (!infinite) {
        return setImageIndex(0);
      } else {
        return setImageIndex(images.length - frameSize);
      }
    }

    return setImageIndex(imageIndex - step);
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        onClick={handlePrev}
        disabled={imageIndex === 0 && !infinite}
      >
        Prev
      </button>
      <div className="Carousel__window" style={{ width: windowWidth + 'px' }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index: number) => {
            const hidden =
              index < imageIndex || index >= imageIndex + frameSize;

            return (
              <li
                key={index + 1}
                className="Carousel__item"
                style={{
                  visibility: hidden ? 'hidden' : 'visible',
                }}
              >
                <img
                  src={image}
                  alt={String(index + 1)}
                  width={itemWidth}
                  style={{ width: itemWidth + 'px', display: 'block' }}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        onClick={handleNext}
        data-cy="next"
        disabled={imageIndex === images.length - frameSize && !infinite}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
