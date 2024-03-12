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
  const [currentImage, setCurrentImage] = useState(1);
  const possibleImage = images.length - frameSize + 1;

  const start = currentImage === 1;
  const end = currentImage === possibleImage;

  const handleNext = () => {
    if (!end) {
      const nextIndex = currentImage + step;

      setCurrentImage(nextIndex > possibleImage ? possibleImage : nextIndex);
    } else if (infinite) {
      setCurrentImage(1);
    }
  };

  const handlePrev = () => {
    if (!start) {
      const nextIndex = currentImage - step;

      setCurrentImage(nextIndex < 1 ? 1 : nextIndex);
    } else if (infinite) {
      setCurrentImage(possibleImage);
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        {images.map(image => (
          <li
            key={image}
            style={{
              transform: `translateX(-${(currentImage - 1) * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={image}
              style={{
                width: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>
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
