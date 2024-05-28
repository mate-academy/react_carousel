import React from 'react';
import { useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(infinite ? step : 0);
  const transform = `translateX(${-currentIndex * itemWidth + -currentIndex * 10}px)`;
  const transition = `transform ${animationDuration}ms ease-in-out`;

  const handleNext = () => {
    // if (infinite && currentIndex === images.length - step ||
    //   currentIndex + frameSize === images.length)
    if (
      infinite &&
      currentIndex === images.length - (step < frameSize ? frameSize : step - 1)
    ) {
      setCurrentIndex(0);

      return;
    }

    setCurrentIndex(
      currentIndex + step + frameSize > images.length
        ? images.length -
            (step < frameSize || frameSize === 1 ? frameSize : step - 1)
        : currentIndex + step,
    );
  };

  const handlePrev = () => {
    if (infinite && currentIndex === 0 && frameSize !== 10) {
      setCurrentIndex(
        step > frameSize ? images.length - step + 1 : images.length - frameSize,
      );

      return;
    }

    setCurrentIndex(currentIndex - step < 0 ? 0 : currentIndex - step);
  };

  const gap = 10;

  return (
    <div
      className="Carousel"
      style={{ width: frameSize * itemWidth + gap * (frameSize - 1) + 'px' }}
    >
      <ul
        className="Carousel__list"
        style={{ transform: transform, transition: transition }}
      >
        {images.map((image: string) => {
          const alt = image.slice(6, -4);

          return (
            <li key={image}>
              <img
                src={image}
                alt={alt}
                className="Carousel__image"
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          );
        })}
      </ul>
      <div className="Carousel__button">
        <button
          type="button"
          className="Carousel__button--prev"
          onClick={handlePrev}
        ></button>
        <button
          type="button"
          className="Carousel__button--next"
          data-cy="next"
          onClick={handleNext}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
