import React, { useState, useEffect } from 'react';
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
  step = 1,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 500,
  infinite = false,
}) => {
  // 1. Start at index 0 if normal, or at the offset of cloned items if infinite
  const [index, setIndex] = useState(infinite ? images.length : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // 2. Clone images: [End] + [Original] + [Beginning]
  const displayImages = infinite ? [...images, ...images, ...images] : images;

  const handleNext = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setTransitionEnabled(true);
    setIndex(prev => prev + step);
  };

  const handlePrev = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setTransitionEnabled(true);
    setIndex(prev => prev - step);
  };

  // 3. Handle the "Seamless Jump"
  useEffect(() => {
    if (!infinite) {
      setIsAnimating(false);

      return;
    }

    const handleTransitionEnd = () => {
      setIsAnimating(false);

      // If we've scrolled into the right clones, jump back to the middle
      if (index >= images.length * 2) {
        setTransitionEnabled(false);
        setIndex(index - images.length);
      }

      // If we've scrolled into the left clones, jump forward to the middle
      if (index < images.length) {
        setTransitionEnabled(false);
        setIndex(index + images.length);
      }
    };

    const timer = setTimeout(handleTransitionEnd, animationDuration);

    return () => clearTimeout(timer);
  }, [index, infinite, images.length, animationDuration]);

  const offset = index * itemWidth;

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: frameSize * itemWidth, overflow: 'hidden' }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            transform: `translateX(-${offset}px)`,
            transition: transitionEnabled
              ? `transform ${animationDuration}ms`
              : 'none',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {displayImages.map((img, i) => (
            <li key={i}>
              <img
                src={img}
                alt="Carousel item"
                width={itemWidth}
                style={{ width: itemWidth, display: 'block' }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          onClick={handlePrev}
          disabled={!infinite && index === 0}
          data-cy="prev"
        >
          {'<'}
        </button>
        <button
          onClick={handleNext}
          disabled={!infinite && index >= images.length - frameSize}
          data-cy="next"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
