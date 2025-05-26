import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  imageWidth: number;
  newImageWidth: (width: number) => void;
  frameSize: number;
  newFrameSize: (size: number) => void;
  currentStep: number;
  newStep: (step: number) => void;
  animationSpeed: number;
  newSpeed: (speed: number) => void;
  currentPosition: number;
  newPosition: (position: number) => void;
}

export const Carousel: React.FC<Props> = ({
  imageWidth,
  newImageWidth,
  frameSize,
  newFrameSize,
  images,
  currentStep,
  newStep,
  animationSpeed,
  newSpeed,
  currentPosition,
  newPosition,
}) => {
  return (
    <div className="main">
      <div
        className="Carousel"
        style={{ width: `${frameSize * imageWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `all ${animationSpeed}ms ease-out`,
            transform: `translateX(${currentPosition}px)`,
          }}
        >
          {images.map((src, index) => (
            <li key={index}>
              <img
                src={src}
                alt={`${index + 1}`}
                style={{ width: `${imageWidth}px`, height: `${imageWidth}px` }}
                width={imageWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={() => {
            const maxNegative = 0;
            const stepPx = currentStep * imageWidth;

            let nextPosition = currentPosition + stepPx;

            if (nextPosition > maxNegative) {
              nextPosition = maxNegative;
            }

            newPosition(nextPosition);
          }}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={() => {
            if (images.length <= frameSize) {
              newPosition(0);
            } else {
              const maxNegative = -((images.length - frameSize) * imageWidth);
              const stepPx = currentStep * imageWidth;

              let nextPosition = currentPosition - stepPx;

              if (nextPosition < maxNegative) {
                nextPosition = maxNegative;
              }

              newPosition(nextPosition);
            }
          }}
        >
          Next
        </button>
      </div>

      <div className="Carousel__settings">
        <label htmlFor="itemId" className="Carousel__label">
          Image width
          <input
            id="itemId"
            type="number"
            min="50"
            max="300"
            step="10"
            value={imageWidth}
            onChange={ev => {
              const newSize = Number(ev.target.value);

              newImageWidth(newSize);
            }}
          />
        </label>
        <label htmlFor="frameId" className="Carousel__label">
          Frame size
          <input
            id="frameId"
            type="number"
            min="2"
            max="5"
            value={frameSize}
            onChange={ev => {
              const newWidth = Number(ev.target.value);

              newFrameSize(newWidth);
            }}
          />
        </label>
        <label htmlFor="stepId" className="Carousel__label">
          Step
          <input
            id="stepId"
            type="number"
            min="1"
            max="3"
            value={currentStep}
            onChange={ev => {
              newStep(Number(ev.target.value));
            }}
          />
        </label>
        <label htmlFor="animationDuration" className="Carousel__label">
          Animation duration
          <input
            id="animationDuration"
            type="number"
            min="300"
            max="3000"
            step="100"
            value={animationSpeed}
            onChange={ev => {
              const newValOfSpeed = Number(ev.target.value);

              newSpeed(newValOfSpeed);
            }}
          />
        </label>
      </div>
    </div>
  );
};
