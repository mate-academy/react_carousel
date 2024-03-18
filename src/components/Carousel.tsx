import React, { useState, useEffect } from 'react';
import './Carousel.scss';
import cn from 'classnames';

export interface CarouselProps {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const DEFAULT_ITEM_WIDTH = 130;
const DEFAULT_FRAME_SIZE = 3;
const DEFAULT_STEP = 3;
const DEFAULT_ANIMATION_DURATION = 1000;

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = DEFAULT_ITEM_WIDTH,
  frameSize = DEFAULT_FRAME_SIZE,
  step = DEFAULT_STEP,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const containerWidth = frameSize * itemWidth + (frameSize - 1) * 10;

  useEffect(() => {
    setStartIndex(prevStartIndex =>
      Math.min(prevStartIndex, images.length - frameSize),
    );
  }, [frameSize, images.length]);

  const handlePrev = () => {
    if (infinite && startIndex === 0) {
      setStartIndex(images.length - frameSize);
    } else {
      setStartIndex(prevStartIndex => Math.max(0, prevStartIndex - step));
    }
  };

  const handleNext = () => {
    if (infinite && startIndex >= images.length - frameSize) {
      setStartIndex(0);
    } else {
      setStartIndex(prevStartIndex =>
        Math.min(images.length - frameSize, prevStartIndex + step),
      );
    }
  };

  const translateX = startIndex * (itemWidth + 10);

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: containerWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={image} className="Carousel__item">
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrev}
          className={cn('Carousel__button')}
          disabled={!infinite && startIndex === 0}
        >
          «
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={cn('Carousel__button')}
          disabled={!infinite && startIndex >= images.length - frameSize}
          data-cy="next"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Carousel;
