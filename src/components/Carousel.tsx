import './Carousel.scss';
import { useState } from 'react';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const buffer = frameSize + step;

  const clonedImages = [
    ...images.slice(-buffer),
    ...images,
    ...images.slice(0, buffer),
  ];

  const displayImages = infinite ? clonedImages : images;

  const [currentIndex, setCurrentIndex] = useState(infinite ? buffer : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxIndex = images.length - frameSize;

  const nextIndex = infinite
    ? currentIndex + step
    : Math.min(currentIndex + step, maxIndex);
  const prevIndex = infinite
    ? currentIndex - step
    : Math.max(currentIndex - step, 0);

  return (
    <div
      className="Carousel"
      style={{
        width: itemWidth * frameSize,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: isTransitioning
            ? `transform ${animationDuration}ms`
            : 'none',
          transform: `translateX(${-(currentIndex * itemWidth)}px)`,
        }}
        onTransitionEnd={() => {
          if (infinite) {
            if (currentIndex - buffer > images.length - 1) {
              setIsTransitioning(false);
              setIsAnimating(false);
              setCurrentIndex(currentIndex - images.length);

              return;
            }

            if (currentIndex - buffer < 0) {
              setIsTransitioning(false);
              setIsAnimating(false);
              setCurrentIndex(currentIndex + images.length);

              return;
            }
          }

          setIsAnimating(false);
        }}
      >
        {displayImages.map((image, index) => (
          <li key={index}>
            <img
              src={image}
              alt={`${index + 1}`}
              style={{
                width: itemWidth,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!infinite && currentIndex === 0}
        onClick={() => {
          if (isAnimating) {
            return;
          }

          setIsTransitioning(true);
          setIsAnimating(true);
          setCurrentIndex(prevIndex);
        }}
      >
        Prev
      </button>
      <button
        data-cy={'next'}
        type="button"
        disabled={!infinite && currentIndex >= maxIndex}
        onClick={() => {
          if (isAnimating) {
            return;
          }

          setIsTransitioning(true);
          setIsAnimating(true);
          setCurrentIndex(nextIndex);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
