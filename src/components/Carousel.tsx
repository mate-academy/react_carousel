import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(infinite ? frameSize : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [customDuration, setCustomDuration] = useState(animationDuration);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setCustomDuration(animationDuration);
  }, [animationDuration]);

  useEffect(() => {
    if (!infinite) {
      const maxIndex = Math.max(0, images.length - frameSize);

      setCurrentIndex(prev => Math.min(prev, maxIndex));
    } else {
      setCurrentIndex(frameSize);
    }
  }, [frameSize, infinite, images.length]);

  const displayImages = useMemo(() => {
    if (!infinite) {
      return images;
    }

    const startImg = images.slice(-frameSize);
    const endImg = images.slice(0, frameSize);

    return [...startImg, ...images, ...endImg];
  }, [infinite, frameSize, images]);

  const handleTransitionEnd = () => {
    if (!infinite) {
      return;
    }

    setIsAnimating(false);

    if (currentIndex <= 0) {
      setCustomDuration(0);
      setCurrentIndex(images.length);
    } else if (currentIndex >= images.length + frameSize) {
      setCustomDuration(0);
      setCurrentIndex(frameSize);
    }
  };

  useEffect(() => {
    if (customDuration === 0) {
      const raf = requestAnimationFrame(() => {
        setCustomDuration(animationDuration);
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [customDuration, animationDuration]);

  const handlePrevSlide = () => {
    if (infinite) {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);
      setCurrentIndex(prev => prev - step);
    } else {
      setCurrentIndex(prev => Math.max(0, prev - step));
    }
  };

  const handleNextSlide = () => {
    if (infinite) {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);
      setCurrentIndex(prev => prev + step);
    } else {
      const maxIndex = images.length - frameSize;

      setCurrentIndex(prev => Math.min(maxIndex, prev + step));
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= images.length - frameSize;

  return (
    <div className="Carousel">
      <button
        type="button"
        data-cy="prev"
        onClick={handlePrevSlide}
        disabled={isPrevDisabled}
        className={`Carousel__btn Carousel__btn--prev ${isPrevDisabled ? 'disabled' : ''}`}
      >
        Prev
      </button>

      <div
        className="Carousel__wrapper"
        style={{
          width: `${frameSize * itemWidth}px`,
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          ref={listRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: 'flex',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transition: `transform ${customDuration}ms ease-in-out`,
            transform: `translateX(-${currentIndex * itemWidth}px)`,
          }}
        >
          {displayImages.map((img, index) => (
            <li
              key={`${img}-${index}`}
              style={{ width: `${itemWidth}px`, minWidth: `${itemWidth}px` }}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px`, display: 'block' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        data-cy="next"
        disabled={isNextDisabled}
        className={`Carousel__btn Carousel__btn--next ${isNextDisabled ? 'disabled' : ''}`}
        onClick={handleNextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
