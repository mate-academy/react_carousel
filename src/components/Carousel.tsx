import React from 'react';
import { useState } from 'react';
import './Carousel.scss';
import { CarouselCard } from './CarouselCard/CarouselCard';

type Props = {
  images: string[];
  imageWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  imageWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentImg, setCurrentImage] = useState(1);
  const maxCurrentImage =
    Math.min(images.length - frameSize, images.length - step) + 1;

  const moveImages = (steps: number) => {
    if (infinite) {
      switch (true) {
        case currentImg === maxCurrentImage &&
          currentImg + steps > maxCurrentImage:
          setCurrentImage(1);
          break;

        case currentImg === 1 && currentImg + steps < 1:
          setCurrentImage(maxCurrentImage);
          break;

        case currentImg + steps > maxCurrentImage:
          setCurrentImage(maxCurrentImage);
          break;

        case currentImg + steps < 1:
          setCurrentImage(1);
          break;

        default:
          setCurrentImage(currentImg + steps);
      }
    } else {
      switch (true) {
        case currentImg + steps > maxCurrentImage:
          setCurrentImage(maxCurrentImage);
          break;

        case currentImg + steps < 1:
          setCurrentImage(1);
          break;

        default:
          setCurrentImage(currentImg + steps);
      }
    }
  };

  return (
    <div className="Carousel" data-cy="title">
      <div
        className="Carousel__container"
        style={{
          width: `${imageWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${(currentImg - 1) * imageWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <CarouselCard
              image={image}
              key={i}
              imageWidth={imageWidth}
              imageNumber={i}
            />
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={currentImg === 1 && !infinite}
          onClick={() => moveImages(-step)}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={currentImg === maxCurrentImage && !infinite}
          onClick={() => moveImages(step)}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
