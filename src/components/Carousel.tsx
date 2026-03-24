import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [start, setStart] = useState<number>(0);

  const effectiveStart = infinite ? start + frameSize : start;
  const offset = effectiveStart * itemWidth;
  const realSize = frameSize * itemWidth;
  const extendedImages = [
    ...images.slice(-frameSize),
    ...images,
    ...images.slice(0, frameSize),
  ];
  const [isTransitioning, setIsTransitioning] = React.useState(true);
  const displayImages = infinite ? extendedImages : images;

  React.useEffect(() => {
    if (!infinite) {
      return;
    }

    if (start >= images.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setStart(0);
      }, animationDuration);
    }

    if (start < 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setStart(images.length - step);
      }, animationDuration);
    }
  }, [start, infinite, images.length, animationDuration, step, setStart]);

  React.useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  return (
    <div className="Carousel">
      <button
        className={`Carousel__arrow Carousel__arrow--left ${!infinite && start === 0 ? 'disable' : ''}`}
        type="button"
        onClick={() => {
          if (infinite) {
            setStart(prev => prev - step);
          } else if (start > 0) {
            setStart(Math.max(start - step, 0));
          }
        }}
      >
        Prev
      </button>
      <div
        className="Carousel__viewport"
        style={{
          ...({
            '--carousel-viewport-width': `${realSize}px`,
          } as React.CSSProperties),
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: isTransitioning
              ? `transform ${animationDuration}ms ease`
              : 'none',
          }}
        >
          {displayImages.map((image, index) => (
            <li
              key={index}
              className="Carousel__item"
              style={{
                ...({
                  '--carousel-item-width': `${itemWidth}px`,
                } as React.CSSProperties),
              }}
            >
              <img
                src={image}
                alt={`${((start + index) % images.length) + 1}`}
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`Carousel__arrow Carousel__arrow--right ${!infinite && start >= images.length - step ? 'disable' : ''}`}
        type="button"
        data-cy="next"
        onClick={() => {
          if (infinite) {
            setStart(prev => prev + step);
          } else if (start < images.length - step) {
            setStart(Math.min(start + step, images.length - step));
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
