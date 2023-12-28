import React, { useState, useRef, useEffect } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}
const Carousel: React.FC<Props> = (
  {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
  },
) => {
  const [shift, setShift] = useState(0);
  const totalImagesWidth = images.length * itemWidth;
  const maxShift = totalImagesWidth - itemWidth * frameSize;
  const prevFrameSizeRef = useRef<number>(frameSize);

  useEffect(() => {
    if (frameSize > prevFrameSizeRef.current
      && shift <= maxShift * -1
      && shift !== 0) {
      setShift(prevShift => prevShift + itemWidth);
    }

    prevFrameSizeRef.current = frameSize;
  }, [frameSize, maxShift, shift, itemWidth]);

  const handleNext = () => {
    const nextShift = shift - step * itemWidth;

    if (nextShift >= -maxShift) {
      setShift(nextShift);
    } else {
      setShift(-maxShift);
    }
  };

  const handlePrev = () => {
    const prevShift = shift + step * itemWidth;

    if (prevShift <= 0) {
      setShift(prevShift);
    } else {
      setShift(0);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${(itemWidth * frameSize)}px`,
      }}
    >
      <div className="Carousel__container">
        <ul
          className="Carousel__list"
        >
          {images.map((image) => {
            return (
              <li key={image}>
                <img
                  src={image}
                  alt={`Item with ID ${image}`}
                  style={{
                    width: `${itemWidth}px`,
                    transform: `translateX(${shift}px)`,
                    transition: `transform ${animationDuration}ms ease-in-out`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__buttons">
          <button
            className={cn('Carousel__button',
              { 'disabled-button': shift === 0 })}
            type="button"
            onClick={handlePrev}
            disabled={shift === 0}
          >
            Prev
          </button>
          <button
            className={cn('Carousel__button',
              {
                'disabled-button':
            shift === -((images.length * itemWidth) - itemWidth * frameSize),
              })}
            type="button"
            data-cy="next"
            onClick={handleNext}
            disabled={
              shift === -((images.length * itemWidth) - itemWidth * frameSize)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
