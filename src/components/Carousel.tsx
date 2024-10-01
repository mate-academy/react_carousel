import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImgIndex, setCurrentImgindex] = useState(0);

  const BUTTON_WIDTH = 40;
  const IMAGE_MARGIN = 16;
  const parentWidth = frameSize * (itemWidth + IMAGE_MARGIN * 2);

  const firstImgInLastFrameIndex =
    Math.ceil(images.length / step) * step - step;
  const canShowPrev = currentImgIndex >= step - 1;
  const canShowNext = currentImgIndex <= images.length - step;

  const handlePrev = () => {
    if (infinite) {
      setCurrentImgindex(prev =>
        currentImgIndex === 0 ? firstImgInLastFrameIndex : prev - step,
      );
    } else if (canShowPrev) {
      setCurrentImgindex(prev => prev - step);
    }
  };

  const handleNext = () => {
    if (infinite) {
      setCurrentImgindex(prev =>
        currentImgIndex === firstImgInLastFrameIndex ? 0 : prev + step,
      );
    } else if (canShowNext) {
      setCurrentImgindex(prev => prev + step);
    }
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${parentWidth + BUTTON_WIDTH * 2}px`,
      }}
    >
      <button
        type="button"
        className="button is-link"
        style={{
          width: `${BUTTON_WIDTH}px`,
        }}
        disabled={!canShowPrev && !infinite}
        onClick={handlePrev}
      >
        «
      </button>

      <div
        className="Carousel__body"
        style={{
          width: `${parentWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${parentWidth}px`,
            transform: `translateX(-${currentImgIndex * (itemWidth + IMAGE_MARGIN * 2)}px)`,
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          {images.map((imagePath, index) => (
            <li
              key={imagePath}
              className="Carousel__item"
              style={{
                marginInline: `${IMAGE_MARGIN}px`,
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
        className="button is-link"
        style={{ width: `${BUTTON_WIDTH}px` }}
        disabled={!canShowNext && !infinite}
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
};

export default Carousel;
