import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  onPageChange: (indexVisibleImages: number[]) => void,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onPageChange,
}) => {
  const gapBetweenPictures = 10;
  const fullVisibleWidth
    = (itemWidth * frameSize) + (frameSize * gapBetweenPictures);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    onPageChange(Array.from({ length: frameSize }, (_, i) => activeIndex + i));
  }, [activeIndex, frameSize, onPageChange]);

  const handleClickToPrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - step, 0));
  };

  const handleClickToNext = () => {
    setActiveIndex(
      (prevIndex) => Math.min(prevIndex + step, images.length - frameSize),
    );
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${fullVisibleWidth}px`,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          gap: `${gapBetweenPictures}px`,
          transform: `translateX(-${(activeIndex * (itemWidth + gapBetweenPictures))}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={image}
            style={{
              height: `${itemWidth}px`,
              width: `${itemWidth}px`,
            }}
          >
            <img
              src={image}
              alt={String(index)}
              style={{
                height: `${itemWidth}px`,
                width: `${itemWidth}px`,
                visibility: index >= activeIndex
                && index < activeIndex + frameSize ? 'visible' : 'hidden',
                transition: `visibility ${animationDuration}ms`,
              }}
            />
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button
          type="button"
          onClick={handleClickToPrev}
          className={cn('button', { disabled: activeIndex === 0 })}
        >
          «
        </button>

        <button
          data-cy="next"
          type="button"
          onClick={handleClickToNext}
          className={cn('button', {
            disabled: activeIndex >= images.length - frameSize,
          })}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Carousel;
