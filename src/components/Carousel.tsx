import React, { useEffect } from 'react';
import './Carousel.scss';
import { useRef, useState } from 'react';

type CarouselProps = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const frameWidth = frameSize * itemWidth;
  const stepPx = step * itemWidth;
  const trackWidth = images.length * itemWidth;

  const maxOffset = Math.min(0, frameWidth - trackWidth);
  const displayImages = infinite ? [...images, ...images, ...images] : images;
  const displayTrackWidth = displayImages.length * itemWidth;

  useEffect(() => {
    if (infinite) {
      setOffset(-trackWidth);
      setIsTransitioning(false);
    }
  }, [infinite, trackWidth]);

  useEffect(() => {
    if (!infinite || !isTransitioning) {
      return;
    }

    const timer = setTimeout(() => {
      if (offset <= -trackWidth * 2) {
        setIsTransitioning(false);
        setOffset(-trackWidth);
      } else if (offset > -trackWidth) {
        setIsTransitioning(false);
        setOffset(-trackWidth * 2 + stepPx);
      }
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [
    offset,
    isTransitioning,
    infinite,
    trackWidth,
    animationDuration,
    stepPx,
  ]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = () => {
    if (infinite) {
      setIsTransitioning(true);
      setOffset(prev => prev - stepPx);
    } else {
      setOffset(prev => Math.max(prev - stepPx, maxOffset));
    }
  };

  const handlePrev = () => {
    if (infinite) {
      setIsTransitioning(true);
      setOffset(prev => prev + stepPx);
    } else {
      setOffset(prev => Math.min(prev + stepPx, 0));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list"
        ref={frameRef}
        style={{ width: frameWidth }}
      >
        <ul
          className="Carousel__track"
          style={{
            transform: `translateX(${offset}px)`,
            transition: isTransitioning
              ? `transform ${animationDuration}ms ease`
              : 'none',
            width: infinite ? displayTrackWidth : trackWidth,
          }}
        >
          {displayImages.map((img, index) => (
            <li
              className="Carousel__item"
              key={`${img}-${index}`}
              style={{ width: itemWidth }}
            >
              <img src={img} alt="" width={itemWidth} height={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__button">
        <button data-cy="prev" onClick={handlePrev}>
          Prev
        </button>
        <button data-cy="next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
