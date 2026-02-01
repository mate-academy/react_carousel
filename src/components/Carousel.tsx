import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';

type CarouselProps = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 500,
  infinite = false,
}) => {
  const [position, setPosition] = useState(infinite ? frameSize : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Clone slides for seamless infinite scroll
  const clonesBefore = infinite ? images.slice(-frameSize) : [];
  const clonesAfter = infinite ? images.slice(0, frameSize) : [];
  const displayImages = [...clonesBefore, ...images, ...clonesAfter];

  const listWidth = displayImages.length * itemWidth;

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setPosition(prev => prev - step);
  };

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setPosition(prev => prev + step);
  };

  // Correct position after animation if we hit clones
  useEffect(() => {
    if (!infinite) {
      setIsAnimating(false);

      return;
    }

    const timeout = setTimeout(() => {
      let newPos = position;

      // If moved to clones at the end
      if (position >= images.length + frameSize) {
        newPos = frameSize;
      }

      // If moved to clones at the beginning
      if (position < frameSize) {
        newPos = images.length + frameSize - step;
        if (newPos < frameSize) {
          newPos = frameSize;
        }
      }

      if (newPos !== position) {
        setIsAnimating(false);
        setPosition(newPos); // jump instantly without animation
        if (listRef.current) {
          listRef.current.style.transition = 'none';
          listRef.current.style.transform = `translateX(-${newPos * itemWidth}px)`;
          // Force reflow to re-enable animation
          void listRef.current.offsetWidth;
          listRef.current.style.transition = `transform ${animationDuration}ms`;
        }
      } else {
        setIsAnimating(false);
      }
    }, animationDuration);

    return () => clearTimeout(timeout);
  }, [
    position,
    infinite,
    frameSize,
    images.length,
    step,
    animationDuration,
    itemWidth,
  ]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: `${frameSize * itemWidth}px`, overflow: 'hidden' }}
      >
        <ul
          ref={listRef}
          className="Carousel__list"
          style={{
            width: `${listWidth}px`,
            display: 'flex',
            transform: `translateX(-${position * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {displayImages.map((img, index) => (
            <li key={index} style={{ flexShrink: 0 }}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          className="Carousel__buttonPrev"
          onClick={handlePrev}
          disabled={!infinite && position === 0}
          data-cy="prev"
        >
          {'<'}
        </button>
        <button
          className="Carousel__buttonNext"
          onClick={handleNext}
          disabled={!infinite && position >= images.length - frameSize}
          data-cy="next"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
