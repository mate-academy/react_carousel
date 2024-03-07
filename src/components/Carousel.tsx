import './Carousel.scss';
import React, { useState } from 'react';
import { State } from '../types/Static';

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
      Math.max(images.length - frameSize, prevImg + step),
    );
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: carouselWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: GAP,
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((img, inx) => (
            <li className="Carousel__item">
              <img src={img} alt={`${inx + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          onClick={slideLeft}
          disabled={!infinite && startImage === 0}
        >
          Prev
        </button>

        <button
          data-cy="next"
          className="Carousel__button"
          type="button"
          onClick={slideRight}
          disabled={!infinite && startImage >= images.length - frameSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
