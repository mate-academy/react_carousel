/* eslint-disable no-console */
import React, { useRef, useState } from 'react';

import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth?: number,
  frameSize?: number,
  step?: number,
};

const Carousel: React.FC<Props> = ({
  images, itemWidth = 130, frameSize = 3, step = 3,
}) => {
  const [nextIsDisabled, setNextIsDisabled] = useState(false);
  const [prevIsDisabled, setPrevIsDisabled] = useState(true);

  const stepPixels = itemWidth * step;
  const frameWidth = itemWidth * frameSize;
  const scrollMin = 0;
  const scrollMax = (itemWidth * images.length) - frameWidth;

  const containerRef = useRef(document.createElement('div'));

  const onPrevClick = () => {
    const scrollTo = Math.round(containerRef.current.scrollLeft - stepPixels);

    if (nextIsDisabled) {
      setNextIsDisabled(false);
    }

    if (scrollTo <= scrollMin) {
      setPrevIsDisabled(true);
    }

    containerRef.current.scrollLeft = scrollTo;
  };

  const onNextClick = () => {
    const scrollTo = Math.round(containerRef.current.scrollLeft + stepPixels);

    if (prevIsDisabled) {
      setPrevIsDisabled(false);
    }

    if (scrollTo >= scrollMax) {
      setNextIsDisabled(true);
    }

    containerRef.current.scrollLeft = scrollTo;
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
        ref={containerRef}
        style={{ width: `${frameWidth}px` }}
      >
        <div className="Carousel">
          <ul className="Carousel__list">
            {images.map(img => {
              const key = img.match(/\d+/g) as string[];

              return (
                <li key={key[0]} className="Carousel__item">
                  <img
                    src={img}
                    alt={key[0]}
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

Carousel.defaultProps = {
  itemWidth: 130,
  frameSize: 3,
  step: 3,
};

export default Carousel;
