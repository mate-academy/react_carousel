import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        disabled={currentIndex === 0}
        type="button"
        data-cy="prev"
        onClick={() => {
          setCurrentIndex(prev => Math.max(prev - step, 0));
        }}
      >
        Prev
      </button>
      <button
        disabled={currentIndex === images.length - frameSize}
        type="button"
        data-cy="next"
        onClick={() => {
          setCurrentIndex(prev =>
            Math.min(prev + step, images.length - frameSize),
          );
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
