import React, { useState } from 'react';
import './Carousel.scss';
import '../button.scss';
import { State } from '../state';

const gap = 10;

const Carousel: React.FC<State> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentImage, setCurrentImage] = useState(1);
  const containerWidth = (itemWidth + gap) * frameSize - gap;
  const translateX = (currentImage - 1) * (itemWidth + gap);

  const moveRight = () => {
    if (infinite && currentImage >= images.length - frameSize + 1) {
      setCurrentImage(1);

      return;
    }

    setCurrentImage(currentImage + step);

    if (currentImage + step >= images.length - frameSize + 1) {
      setCurrentImage(images.length - frameSize + 1);
    }
  };

  const moveLeft = () => {
    if (infinite && currentImage === 1) {
      setCurrentImage(images.length - frameSize + 1);

      return;
    }

    if (currentImage - step < 1) {
      setCurrentImage(1);
    } else {
      setCurrentImage(currentImage - step);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: containerWidth,
          height: itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: `${gap}px`,
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map((image, index) => (
            <li className="Carousel__item" key={image}>
              <img src={image} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          className={
            currentImage === 1 && !infinite
              ? 'buttons__item'
              : 'buttons__item button-active'
          }
          type="button"
          onClick={moveLeft}
        >
          Prev
        </button>
        <button
          data-cy="next"
          className={
            currentImage === images.length - frameSize + 1 && !infinite
              ? 'buttons__item'
              : 'buttons__item button-active'
          }
          type="button"
          onClick={moveRight}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
