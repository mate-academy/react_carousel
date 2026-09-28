import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize = 3,
  itemWidth = 130,
  animationDuration,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [withAnimation, setWithAnimation] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);

  const imagesCount = images.length;
  const maxIndex = imagesCount - frameSize;

  const normalize = (index: number) =>
    ((index % imagesCount) + imagesCount) % imagesCount;

  useEffect(() => {
    if (infinite) {
      return;
    }

    setCurrentIndex(prev =>
      Math.min(prev, Math.max(0, imagesCount - frameSize)),
    );
  }, [frameSize, imagesCount, infinite]);

  const handleNext = () => {
    if (animationDuration > 0 && isAnimating) {
      return;
    }

    if (infinite) {
      setIsAnimating(animationDuration > 0);

      const nextIndex = Math.min(
        currentIndex + step,
        imagesCount * 2 - frameSize,
      );

      setCurrentIndex(animationDuration > 0 ? nextIndex : normalize(nextIndex));
    } else {
      setCurrentIndex(prev => Math.min(prev + step, maxIndex));
    }
  };

  const handlePrev = () => {
    if (animationDuration > 0 && isAnimating) {
      return;
    }

    if (infinite) {
      setIsAnimating(animationDuration > 0);

      const prevIndex = Math.max(currentIndex - step, -imagesCount);

      setCurrentIndex(animationDuration > 0 ? prevIndex : normalize(prevIndex));
    } else {
      setCurrentIndex(prev => Math.max(prev - step, 0));
    }
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);

    if (!infinite) {
      return;
    }

    const normalized = normalize(currentIndex);

    if (normalized !== currentIndex) {
      setWithAnimation(false);
      setCurrentIndex(normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithAnimation(true));
      });
    }
  };

  const isPrevDisabled = !infinite && currentIndex === 0;
  const isNextDisabled = !infinite && currentIndex >= maxIndex;

  const dynamicStyles = {
    '--item-width': `${itemWidth}px`,
    '--frame-size': frameSize,
    '--offset': infinite ? currentIndex + imagesCount : currentIndex,
    '--animation-duration': withAnimation ? `${animationDuration}ms` : '0ms',
  } as React.CSSProperties;

  const listImages = infinite ? [...images, ...images, ...images] : images;

  return (
    <div className="Carousel" style={dynamicStyles}>
      <ul className="Carousel__list" onTransitionEnd={handleTransitionEnd}>
        {listImages.map((image, index) => (
          <li key={index} className="Carousel__item">
            <img
              src={image}
              alt={image}
              className="Carousel__image"
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
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
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
