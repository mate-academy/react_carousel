import React, { useState } from 'react';
import s from './Carousel.module.scss';
import { AppState } from '../../types';

export const Carousel: React.FC<AppState> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [translate, setTranslate] = useState(0);

  const shift = step * itemWidth;
  const totalWidth = images.length * itemWidth;
  const frameWidth = frameSize * itemWidth;

  const maxTranslate = 0;
  const minTranslate = -(totalWidth - frameWidth);

  const isPrevDisabled = !infinite && translate === maxTranslate;
  const isNextDisabled = !infinite && translate <= minTranslate;

  const scrollRange = Math.max(0, totalWidth - frameWidth); // positive amount we can scroll

  const move = (dir: 1 | -1) => {
    if (!images.length || step <= 0 || itemWidth <= 0) {
      return;
    }

    const pos = -translate;
    const forward = dir === -1;

    if (forward) {
      const nextPos = pos + shift;

      if (pos < scrollRange && nextPos < scrollRange) {
        // normal step (doesn't reach boundary)
        setTranslate(-nextPos);

        return;
      }

      if (pos < scrollRange && nextPos >= scrollRange) {
        // overshoots: first go exactly to boundary
        setTranslate(-scrollRange);

        return;
      }

      // pos === scrollRange (we are at rightmost) -> wrap to start
      if (pos === scrollRange) {
        if (infinite) {
          setTranslate(0);
        } else {
          setTranslate(-scrollRange); // already at end; keep it
        }

        return;
      }
    } else {
      // moving backward (Prev)
      const nextPos = pos - shift;

      if (pos > 0 && nextPos > 0) {
        // normal step backward
        setTranslate(-nextPos);

        return;
      }

      if (pos > 0 && nextPos <= 0) {
        // overshoots to the left: first go exactly to 0
        setTranslate(0);

        return;
      }

      // pos === 0 (we are at leftmost) -> wrap to end
      if (pos === 0) {
        if (infinite) {
          setTranslate(-scrollRange);
        } else {
          setTranslate(0);
        }

        return;
      }
    }
  };

  if (!images.length) {
    return <div className={s.carouselWrapper}>No Images</div>;
  }

  return (
    <div className={s.carouselWrapper} style={{ width: totalWidth }}>
      <div className={s.carousel} style={{ width: frameWidth }}>
        <ul
          className={s.carouselList}
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((img, index) => (
            <li className={s.carouselItem} key={img + index}>
              <img
                width={itemWidth}
                src={img}
                alt={img}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>

        <div className={s.carouselButtons}>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={isPrevDisabled}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={isNextDisabled}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
