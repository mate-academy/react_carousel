import React, { useState } from 'react';
import './Carousel.scss';

type Prop = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Prop> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [currentImg, setCurrentImage] = useState(1);
  const maxCurrentImage = Math.min(images.length - frameSize,
    images.length - step) + 1;

  const moveButton = (s: number) => {
    if (infinite) {
      switch (true) {
        case currentImg + s > maxCurrentImage:
          setCurrentImage(1);
          break;

        case currentImg + s < 1:
          setCurrentImage(maxCurrentImage);
          break;

        default:
          setCurrentImage(currentImg + s);
      }
    } else {
      switch (true) {
        case currentImg + s > maxCurrentImage:
          setCurrentImage(maxCurrentImage);
          break;

        case currentImg + s < 1:
          setCurrentImage(1);
          break;

        default:
          setCurrentImage(currentImg + s);
      }
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${(currentImg - 1) * itemWidth}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => (
            <li key={image}>
              <img
                src={image}
                alt={`emoji${i}`}
                className="Carousel__img"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          disabled={currentImg === 1 && !infinite}
          onClick={() => moveButton(-step)}
        >
          Prev
        </button>
        <button
          type="button"
          disabled={currentImg === maxCurrentImage && !infinite}
          onClick={() => moveButton(step)}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
