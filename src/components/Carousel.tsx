import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  updateFrameSize: (newFrameSize: number) => void;
  step: number;
  updateStep: (newStep: number) => void;
  itemWidth: number;
  updateItemWidth: (newItemWidth: number) => void;
  animationDuration: number;
  updateAnimationDuration: (newAnimationDuration: number) => void;
  currentIndex: number;
  updateCurrentIndex: (index: number) => void;
  infinite: boolean;
  updateInfinite: (state: boolean) => void;
};

export const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  updateFrameSize,
  step,
  updateStep,
  itemWidth,
  updateItemWidth,
  animationDuration,
  updateAnimationDuration,
  currentIndex,
  updateCurrentIndex: setCurrentIndex,
  infinite,
  updateInfinite,
}) => {
  const handleNext = () => {
    let newIndex = currentIndex + step;

    if (newIndex >= images.length - frameSize) {
      if (infinite) {
        newIndex = newIndex + frameSize - images.length;
      } else {
        newIndex = images.length - frameSize;
      }
    }

    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    let newIndex = currentIndex - step;

    if (newIndex < 0) {
      if (infinite) {
        newIndex = images.length - step;
      } else {
        newIndex = 0;
      }
    }

    setCurrentIndex(newIndex);
  };

  const transformValue = -currentIndex * itemWidth;

  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <button
          className="carousel__button"
          type="button"
          onClick={handlePrev}
        >
          Prev
        </button>
        <div
          className="carousel__list__wrapper"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(${transformValue}px)`,
              transition: `transform ${animationDuration}s ease`,
            }}
          >
            {images.map((image: string, index: number) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index}`}
                  className="carousel__img"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="carousel__button"
          type="button"
          data-cy="next"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <label>
        {`Frame size is ${frameSize} `}
        <input
          type="range"
          min="2"
          max="5"
          value={frameSize}
          onChange={(event) => updateFrameSize(+event.target.value)}
        />
      </label>
      <label>
        {`Step number is ${step} `}
        <input
          type="range"
          min="2"
          max="5"
          value={step}
          onChange={(event) => updateStep(+event.target.value)}
        />
      </label>
      <label>
        {`Itemwidth is ${itemWidth} `}
        <input
          type="range"
          min="130"
          max="200"
          value={itemWidth}
          onChange={(event) => updateItemWidth(+event.target.value)}
        />
      </label>
      <label>
        {`Animation duration ${animationDuration}s `}
        <input
          type="range"
          min="1"
          max="3"
          value={animationDuration}
          onChange={(event) => updateAnimationDuration(+event.target.value)}
        />
      </label>
      <label>
        {'Infinite loop '}
        <input type="checkbox" onChange={() => updateInfinite(!infinite)} />
      </label>
    </div>
  );
};
