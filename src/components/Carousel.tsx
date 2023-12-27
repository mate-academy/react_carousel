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
  const [position, setPosition] = useState(0);
  const maxPosition = images.length - frameSize;

  useEffect(() => {
    if (frameSize > prevFrameSizeRef.current && position > maxPosition) {
      setPosition(prevPosition => prevPosition - 1);
    }

    prevFrameSizeRef.current = frameSize;
  }, [frameSize, position, maxPosition]);

  const handleNext = () => {
    const nextShift = shift - step * itemWidth;

    if (nextShift >= -maxShift) {
      setShift(nextShift);
    } else {
      setShift(-maxShift);
    }

    if (position < maxPosition) {
      setPosition(position + 1);
    }
  };

  const handlePrev = () => {
    const prevShift = shift + step * itemWidth;

    if (prevShift <= 0) {
      setShift(prevShift);
    } else {
      setShift(0);
    }

    if (position > 0) {
      setPosition(position - 1);
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
            const id = parseInt(image, 10);

            return (
              <li key={id}>
                <img
                  src={image}
                  alt={`Item with ID ${id}`}
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
