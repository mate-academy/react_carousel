import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(images.length - frameSize, 0);

  const next = () => {
    setPosition(prevPos => {
      const newPosition = prevPos + step;

      if (infinite) {
        return newPosition % images.length;
      }

      return Math.min(newPosition, maxPosition);
    });
  };

  const prev = () => {
    setPosition(prevPos => {
      const newPosition = prevPos - step;

      if (infinite) {
        // Добавляем длину и снова берём модуль, чтобы избежать отрицательных значений
        return (newPosition + images.length) % images.length;
      }

      return Math.max(newPosition, 0);
    });
  };

  const containerWidth = itemWidth * frameSize;

  return (
    <div
      style={{
        width: containerWidth,
        overflow: 'hidden',
        position: 'relative',
        margin: 'auto',
      }}
    >
      <ul
        style={{
          display: 'flex',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          transform: `translateX(${-position * itemWidth}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map((src, i) => (
          <li key={i} style={{ minWidth: itemWidth, paddingRight: '8px' }}>
            <img
              src={src}
              alt={`img-${i + 1}`}
              width={itemWidth}
              height={itemWidth}
              style={{ display: 'block' }}
            />
          </li>
        ))}
      </ul>

      <button
        data-cy="prev"
        onClick={prev}
        disabled={!infinite && position === 0}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          cursor: !infinite && position === 0 ? 'not-allowed' : 'pointer',
          opacity: !infinite && position === 0 ? 0.5 : 1,
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          userSelect: 'none',
        }}
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        data-cy="next"
        onClick={next}
        disabled={!infinite && position >= maxPosition}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          cursor:
            !infinite && position >= maxPosition ? 'not-allowed' : 'pointer',
          opacity: !infinite && position >= maxPosition ? 0.5 : 1,
          background: 'none',
          border: 'none',
          fontSize: '2rem',
          userSelect: 'none',
        }}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
