import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const GAP = 10;

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = images.length - frameSize;
  const canLeft = infinite || position > 0;
  const canRight = infinite || position < maxPosition;

  const moveRight = () => {
    if (!canRight) {
      return;
    }

    setPosition(prev => {
      const next = prev + step;

      if (next > maxPosition) {
        return infinite ? 0 : maxPosition;
      }

      return next;
    });
  };

  const moveLeft = () => {
    if (!canLeft) {
      return;
    }

    setPosition(prev => {
      const next = prev - step;

      if (next < 0) {
        return infinite ? maxPosition : 0;
      }

      return next;
    });
  };

  return (
    <div className="carousel">
      <button
        data-cy="prev"
        className={`arrow left ${!canLeft ? 'disabled' : ''}`}
        onClick={moveLeft}
        disabled={!canLeft}
      >
        ‹
      </button>

      <div
        className="window"
        style={{
          width: frameSize * itemWidth + GAP * (frameSize - 1),
        }}
      >
        <ul
          className="track"
          style={{
            transform: `translateX(-${position * (itemWidth + GAP)}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((src, index) => (
            <li key={index} className="item" style={{ marginRight: GAP }}>
              <img src={src} alt="" width={itemWidth} height={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className={`arrow right ${!canRight ? 'disabled' : ''}`}
        onClick={moveRight}
        disabled={!canRight}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
