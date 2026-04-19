import React from 'react';
import { useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeItemWidth = Math.max(1, itemWidth);
  const safeFrameSize = Math.max(1, frameSize);
  const safeStep = Math.max(1, step);
  const safeAnimation = Math.max(0, animationDuration);
  const maxIndex = Math.max(0, images.length - safeFrameSize);

  const gap = 0;
  const slideSize = safeItemWidth + gap;
  const shift = currentIndex * slideSize;
  const totalWidth = images.length * slideSize;

  const handleNext = () => {
    if (infinite) {
      setCurrentIndex(prev =>
        prev + safeStep > maxIndex ? 0 : Math.min(prev + safeStep, maxIndex),
      );
    } else {
      setCurrentIndex(prev => Math.min(prev + safeStep, maxIndex));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setCurrentIndex(prev =>
        prev - safeStep < 0 ? maxIndex : Math.max(prev - safeStep, 0),
      );
    } else {
      setCurrentIndex(prev => Math.max(prev - safeStep, 0));
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex === maxIndex;

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{
          width: `${safeFrameSize * safeItemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            padding: 0,
            margin: 0,
            listStyle: 'none',
            transform: `translateX(-${shift}px)`,
            transition: `transform ${safeAnimation}ms ease`,
            width: `${totalWidth}px`,
          }}
        >
          {images.map((image, index) => (
            <li
              key={index}
              style={{ width: `${itemWidth}px`, flex: '0 0 auto' }}
            >
              <img
                src={image}
                alt={`img-${index}`}
                width={safeItemWidth}
                style={{ width: '100%', display: 'block' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="prev"
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        {' '}
        Next{' '}
      </button>
    </div>
  );
};

export default Carousel;
