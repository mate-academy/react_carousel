import React, { useState, useRef } from 'react';
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
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const totalItems = images.length;
  const frameWidth = frameSize * itemWidth;
  const totalWidth = totalItems * itemWidth;
  const maxOffset = totalWidth - frameWidth;
  const listRef = useRef<HTMLUListElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = useState(infinite ? -totalWidth : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (!listRef.current) {
      return;
    }

    const newPosition = position - step * itemWidth;

    if (infinite) {
      setIsTransitioning(true);
      setPosition(newPosition);

      if (newPosition <= -2 * totalWidth) {
        setTimeout(() => {
          setIsTransitioning(false);
          setPosition(-totalWidth);
        }, animationDuration);
      }
    } else {
      if (Math.abs(newPosition) >= maxOffset) {
        setPosition(-maxOffset);
      } else {
        setPosition(newPosition);
      }
    }
  };

  const handlePrev = () => {
    if (!listRef.current) {
      return;
    }

    const newPosition = position + step * itemWidth;

    if (infinite) {
      setIsTransitioning(true);
      setPosition(newPosition);

      if (newPosition >= 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setPosition(-totalWidth);
        }, animationDuration);
      }
    } else {
      setPosition(Math.min(newPosition, 0));
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameWidth}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ul
        ref={listRef}
        className="Carousel__list"
        style={{
          listStyle: 'none',
          display: 'flex',
          width: infinite ? `${3 * totalWidth}px` : `${totalWidth}px`,
          transform: `translateX(${position}px)`,
          transition: isTransitioning
            ? `transform ${animationDuration}ms ease-in-out`
            : 'none',
          margin: '0',
          padding: '0',
        }}
      >
        {(infinite ? [...images, ...images, ...images] : images).map(
          (image, index) => (
            <li key={index}>
              <img
                id={`${index + 1}`}
                src={image}
                alt={`${index + 1}`}
                width={itemWidth}
                ref={imgRef}
              />
            </li>
          ),
        )}
      </ul>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" onClick={handleNext} data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
