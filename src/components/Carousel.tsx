import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const gap = 10;
  const [currentImage, setCurrentImage] = useState(1);
  const containerWidth = (itemWidth + gap) * frameSize - gap;
  const translateX = (currentImage - 1) * (itemWidth + gap);

  const rightMove = () => {
    if (infinite && currentImage >= images.length - frameSize + 1) {
      setCurrentImage(1);

      return;
    }

    setCurrentImage(currentImage + step);

    if (currentImage + step >= images.length - frameSize + 1) {
      setCurrentImage(images.length - frameSize + 1);
      return;
    }
  };

  const leftMove = () => {
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
              <img
                src={image}
                alt={`${index} + 1`}
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          type="button"
          onClick={leftMove}
          className={
            currentImage === 1 && !infinite
              ? 'buttons__item'
              : 'buttons__item buttons-active'
          }
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={rightMove}
          className={
            currentImage === images.length - frameSize + 1 && !infinite
              ? 'buttons__item'
              : 'buttons__item buttons-active'
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
