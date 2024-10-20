import React, { useState } from 'react';
import './Carousel.scss';

import 'bulma/css/bulma.css';

type Props = {
  step: number;
  images: string[];
  frameSize: number;
  itemWidth: number;
  infinite?: boolean;
  animationDuration?: number;
};

const IMAGE_GAP = 10;
const DEFAULT_WIDTH = 40;

export const Carousel: React.FC<Props> = ({
  step,
  images,
  infinite,
  itemWidth,
  frameSize,
  animationDuration,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const wrapperWidth = frameSize * (itemWidth + IMAGE_GAP * 2);

  const firstImgInLastFrameIndex =
    Math.ceil(images.length / step) * step - step;

  const canShowPrev = imageIndex >= step - 1;
  const canShowNext = imageIndex <= images.length - step;

  const handleButtonNext = () => {
    if (infinite) {
      setImageIndex(current =>
        imageIndex === firstImgInLastFrameIndex ? 0 : current + step,
      );
    }

    if (canShowNext) {
      setImageIndex(current => current + step);
    }
  };

  const handleButtonPrevious = () => {
    if (infinite) {
      setImageIndex(current =>
        imageIndex === 0 ? firstImgInLastFrameIndex : current - step,
      );
    }

    if (canShowPrev) {
      setImageIndex(current => current - step);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${wrapperWidth + DEFAULT_WIDTH * 2}px`,
      }}
    >
      <button
        type="button"
        className="button"
        style={{
          width: `${DEFAULT_WIDTH}px`,
        }}
        disabled={!canShowPrev && !infinite}
        onClick={handleButtonPrevious}
      >
        «
      </button>

      <div
        className="Carousel__body"
        style={{
          width: `${wrapperWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${wrapperWidth}px`,
            transform: `translateX(-${imageIndex * (itemWidth + IMAGE_GAP * 2)}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map((imagePath, index) => (
            <li
              key={imagePath}
              className="Carousel__item"
              style={{
                marginInline: `${IMAGE_GAP}px`,
                width: `${itemWidth}px`,
              }}
            >
              <img
                src={imagePath}
                alt={`Image №${index + 1}`}
                width={itemWidth}
                style={{
                  maxWidth: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        type="button"
        className="button"
        style={{ width: `${DEFAULT_WIDTH}px` }}
        disabled={!canShowNext && !infinite}
        onClick={handleButtonNext}
      >
        »
      </button>
    </div>
  );
};
