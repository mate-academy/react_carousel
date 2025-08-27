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
  const [currentIndex, setCurrentIndex] = useState(0);
  const isNextDisable =
    (!infinite && currentIndex === images.length - frameSize) || false;
  const isPrevDisable = (!infinite && currentIndex === 0) || false;

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrap"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth * images.length}px`,
            transform: `translateX(-${itemWidth * currentIndex}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map((imageSrc, index) => (
            <li key={imageSrc}>
              <img
                src={imageSrc}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={isPrevDisable}
        type="button"
        data-cy="prev"
        onClick={() => {
          if (infinite) {
            setCurrentIndex(
              prev => (prev - step + images.length) % images.length,
            );
          } else {
            setCurrentIndex(prev => Math.max(prev - step, 0));
          }
        }}
      >
        Prev
      </button>
      <button
        disabled={isNextDisable}
        type="button"
        data-cy="next"
        onClick={() => {
          if (infinite) {
            setCurrentIndex(prev => (prev + step) % images.length);
          } else {
            setCurrentIndex(prev =>
              Math.min(prev + step, images.length - frameSize),
            );
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
