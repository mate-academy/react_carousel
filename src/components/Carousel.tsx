import React, { useCallback, useEffect, useState } from 'react';
import './Carousel.scss';

import { State } from '../Types/State';

const Carousel: React.FC<State> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [shift, setShift] = useState<number>(0);
  const maxShift: number = -itemWidth * (images.length - frameSize);
  const minShift: number = 0;

  const computeNextShift = useCallback(
    (prevShift: number, isNext: boolean) => {
      const nextShift = isNext
        ? prevShift - step * itemWidth
        : prevShift + step * itemWidth;

      return nextShift;
    },
    [step, itemWidth],
  );

  const moveNext = () => {
    setShift(prev => {
      const nextShift = computeNextShift(prev, true);

      if (infinite) {
        return nextShift < maxShift ? 0 : nextShift;
      }

      return Math.max(nextShift, maxShift);
    });
  };

  const movePrev = () => {
    setShift(prev => {
      const nextShift = computeNextShift(prev, false);

      if (infinite) {
        return nextShift > minShift ? maxShift : nextShift;
      }

      return Math.min(nextShift, minShift);
    });
  };

  useEffect(() => {
    setShift(0);
  }, [itemWidth]);

  useEffect(() => {
    if (!infinite) {
      return;
    }

    let returnedOnce = false;

    const interval = setInterval(() => {
      setShift(prev => {
        const next = computeNextShift(prev, true);

        if (next < maxShift) {
          if (!returnedOnce) {
            returnedOnce = true;

            return maxShift;
          } else {
            returnedOnce = false;

            return 0;
          }
        }

        return next;
      });
    }, animationDuration + 1000);

    return () => clearInterval(interval);
  }, [infinite, animationDuration, maxShift, computeNextShift]);

  return (
    <div className="Carousel">
      <button
        onClick={movePrev}
        type="button"
        disabled={!infinite && shift === minShift}
        data-cy="prev"
      >
        Prev
      </button>
      <div
        className="Carousel__container"
        style={{ width: itemWidth * frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${shift}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li key={index} className="Carousel__item">
              <img
                style={{ width: itemWidth }}
                width={itemWidth}
                src={image}
                alt={String(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={moveNext}
        data-cy="next"
        type="button"
        disabled={!infinite && shift === maxShift}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
