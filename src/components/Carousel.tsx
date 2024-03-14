import React, { useState } from 'react';

import { State } from '../types/State';
import './Carousel.scss';

const GAP = 10;

const Carousel: React.FC<State> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [startImage, setStartImage] = useState(0);
  const carouselWidth = frameSize * itemWidth + (frameSize - 1) * GAP;
  const translateX = startImage * (itemWidth + GAP);
  const isPrevDisabled = !infinite && startImage === 0;
  const isNextDisabled = !infinite && startImage >= images.length - frameSize;

  const slideLeft = () => {
    if (infinite && startImage === 0) {
      setStartImage(images.length - frameSize);

      return;
    }

    setStartImage(prevImg => Math.max(0, prevImg - step));
  };

  const slideRight = () => {
    if (infinite && startImage >= images.length - frameSize) {
      setStartImage(0);

      return;
    }

    setStartImage(prevImg =>
      Math.min(prevImg + step, images.length - frameSize),
    );
  };

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        style={{
          width: carouselWidth,
        }}
      >
        <ul
          className="carousel__list"
          style={{
            gap: GAP,
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((img: string, inx: number) => (
            <li className="carousel__item" key={img}>
              <img src={img} alt={`${inx + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="carousel__buttons">
        <button
          className="carousel__button"
          type="button"
          onClick={slideLeft}
          disabled={isPrevDisabled}
        >
          Prev
        </button>

        <button
          data-cy="next"
          className="carousel__button"
          type="button"
          onClick={slideRight}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
