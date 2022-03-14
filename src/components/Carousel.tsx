/* eslint-disable react/require-default-props */
import React, { useState } from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth?: number,
  frameSize?: number,
  step?: number,
  animationDuration?: number,
  infinite?: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  const [prevIsDisabled, setPrevIsDisabled] = useState(!infinite);
  const [offset, setOffset] = useState(0);

  const itemPadding = 10;
  const itemWidthPadding = itemWidth + itemPadding * 2;
  const stepPixels = itemWidthPadding * step;
  const frameWidth = itemWidthPadding * frameSize;
  const carouselWidth = itemWidthPadding * images.length;
  const scrollMin = 0;
  const scrollMax = carouselWidth - frameWidth;

  const onPrevClick = () => {
    let newOffset = offset - stepPixels;

    if (infinite && offset === scrollMin) {
      newOffset = carouselWidth - frameWidth;
    } else if (newOffset < scrollMin) {
      newOffset = scrollMin;
    }

    if (!infinite) {
      if (nextIsDisabled) {
        setNextIsDisabled(false);
      }

      if (newOffset === scrollMin) {
        setPrevIsDisabled(true);
      }
    }

    setOffset(newOffset);
  };

  const onNextClick = () => {
    let newOffset = offset + stepPixels;

    if (infinite && offset === scrollMax) {
      newOffset = scrollMin;
    } else if (newOffset > scrollMax) {
      newOffset = scrollMax;
    }

    if (!infinite) {
      if (prevIsDisabled) {
        setPrevIsDisabled(false);
      }

      if (newOffset === scrollMax) {
        setNextIsDisabled(true);
      }
    }

    setOffset(newOffset);
  };

  return (
    <div className="container">
      <button
        type="button"
        className="button"
        disabled={prevIsDisabled}
        onClick={onPrevClick}
      >
        ←
      </button>

      <div
        className="img-container"
        style={{ width: `${frameWidth}px` }}
      >
        <div
          className="Carousel"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          <ul className="Carousel__list">
            {images.map(img => {
              const key = img.match(/\d+/g) as string[];

              return (
                <li
                  key={key[0]}
                  className="Carousel__item"
                  style={{ padding: `${itemPadding}px` }}
                >
                  <img
                    src={img}
                    alt={key[0]}
                    className="Carousel__img"
                    style={{ width: `${itemWidth}px` }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="button"
        disabled={nextIsDisabled}
        onClick={onNextClick}
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
