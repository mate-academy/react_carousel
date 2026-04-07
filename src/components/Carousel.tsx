import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step: number;
  animationDuration: number;
  infinity: boolean;
}

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 300,
  frameSize = 3,
  step,
  animationDuration,
  infinity,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const contWidth = itemWidth * frameSize;
  const translateX = currentIndex * itemWidth;

  const moveNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + step;

      if (infinity) {
        return nextIndex > images.length - frameSize ? 0 : nextIndex;
      }

      return Math.min(nextIndex, images.length - frameSize);
    });
  };

  const movePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - step;

      if (infinity && next < 0) {
        return images.length - frameSize;
      }

      return Math.max(next, 0);
    });
  };

  const isNextDisavled = !infinity && currentIndex + frameSize >= images.length;
  const isPrevDisavled = !infinity && currentIndex === 0;

  return (
    <div
      className="Carousel"
      style={{
        width: contWidth,
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          width: `${images.length * itemWidth}px`,
          transform: `translateX(-${translateX}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map(image => (
            <li key={image}>
              <img
                src={image}
                alt="img"
                width={itemWidth}
                style={{
                  width: itemWidth,
                  height: 'auto',
                  display: 'block',
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={movePrev} disabled={isPrevDisavled}>
        Prev
      </button>

      <div className="controls">
        <button
          type="button"
          data-cy="next"
          onClick={moveNext}
          disabled={isNextDisavled}
        >
          Next
        </button>
      </div>
    </div>
  );
};
