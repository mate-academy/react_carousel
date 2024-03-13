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
  const [currentImage, setCurrentImage] = useState(0);
  const possibleImage = images.length - frameSize;

  const start = currentImage === 0;
  const end = currentImage === possibleImage;

  const handleNext = () => {
    if (!end) {
      const nextIndex = currentImage + step;

      setCurrentImage(
        infinite
          ? nextIndex % images.length
          : Math.min(nextIndex, possibleImage),
      );
    } else if (infinite) {
      setCurrentImage(0);
    }
  };

  const handlePrev = () => {
    if (!start) {
      const nextIndex = currentImage - step;

      setCurrentImage(
        infinite
          ? (nextIndex + images.length) % images.length
          : Math.max(nextIndex, 0),
      );
    } else if (infinite) {
      setCurrentImage(possibleImage);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize + (frameSize - 1)}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentImage * itemWidth}px)`,
            transition: `transform ${animationDuration}ms ease`,
          }}
        >
          {images.map(image => (
            <li key={image}>
              <img src={image} alt={image} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className={`Carousel__button ${start && !infinite ? 'Carousel__button--off' : ''}`}
          onClick={() => handlePrev()}
        >
          {'<<<'}
        </button>
        <button
          type="button"
          className={`Carousel__button ${end && !infinite ? 'Carousel__button--off' : ''}`}
          data-cy="next"
          onClick={() => handleNext()}
        >
          {'>>>'}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
