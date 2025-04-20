import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentX, setCurrentX] = useState(0);
  const fullCarouselWidth = images.length * itemWidth;
  const visibleFrameWidth = frameSize * itemWidth;
  const maxNegativeOffset = Math.min(0, visibleFrameWidth - fullCarouselWidth);
  const moveStep = step * itemWidth;
  const isAtRightEdge = currentX === maxNegativeOffset;
  const isAtLeftEdge = currentX === 0;

  const shouldDisableButton = (isInfinite: boolean, edge: boolean): boolean =>
    isInfinite ? false : edge;

  const moveCarouselRight = () => {
    if (infinite && isAtRightEdge) {
      setCurrentX(0);
    } else {
      setCurrentX(prev => Math.max(prev - moveStep, maxNegativeOffset));
    }
  };

  const moveCarouselLeft = () => {
    if (infinite && isAtLeftEdge) {
      setCurrentX(maxNegativeOffset);
    } else {
      setCurrentX(prev => Math.min(prev + moveStep, 0));
    }
  };

  return (
    <div className="Carousel">
      <button
        type="button"
        disabled={shouldDisableButton(infinite, isAtLeftEdge)}
        onClick={moveCarouselLeft}
      >
        ◀️
      </button>
      <div
        className="Carousel__viewport"
        style={{ width: `${visibleFrameWidth}px ` }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${fullCarouselWidth}px`,
            transform: `translateX(${currentX}px)`,
            transition: `all ${animationDuration}ms ease-out`,
          }}
        >
          {images.map((image, i) => (
            <li
              key={`${image}-${i}`}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={`Slide ${i + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        disabled={shouldDisableButton(infinite, isAtRightEdge)}
        onClick={moveCarouselRight}
      >
        ▶️
      </button>
    </div>
  );
};

export default Carousel;
