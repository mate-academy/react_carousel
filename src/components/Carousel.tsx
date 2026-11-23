import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [position, setPosition] = useState(0);

  const maxPosition = Math.max(0, images.length - frameSize);
  const current = Math.min(position, maxPosition);

  const showPrev = () => {
    const nextPosition = current - step;

    if (nextPosition < 0) {
      if (infinite) {
        setPosition(maxPosition);
      } else {
        setPosition(0);
      }

      return;
    }

    setPosition(nextPosition);
  };

  const showNext = () => {
    const nextPosition = current + step;

    if (nextPosition > maxPosition) {
      if (infinite) {
        setPosition(0);
      } else {
        setPosition(maxPosition);
      }

      return;
    }

    setPosition(nextPosition);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__window"
        style={{ width: itemWidth * frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${current * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={String(index + 1)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={showPrev}>
        Prev
      </button>

      <button type="button" data-cy="next" onClick={showNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
