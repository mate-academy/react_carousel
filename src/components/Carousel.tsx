import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

type CarouselProps = State & {
  setAppState: (newState: Partial<State>) => void;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  setAppState,
}) => {
  const [transformValue, setTransformValue] = useState(0);
  const stepWidth = itemWidth * step;
  const visibleFrame = itemWidth * frameSize;
  const totalWidth = images.length * itemWidth;
  const infiniteImages = [...images, ...images, ...images, ...images];
  const imagesToRender = infinite ? infiniteImages : images;

  const handleNextClick = () => {
    setTransformValue((prevTransformValue) => {
      let newTransformValue = prevTransformValue - stepWidth;

      if ((newTransformValue + totalWidth) <= visibleFrame) {
        newTransformValue = prevTransformValue
          - (newTransformValue + totalWidth)
          + (itemWidth * (frameSize - step));
      }

      return newTransformValue;
    });
  };

  const handlePrevClick = () => {
    setTransformValue((prevTransformValue) => {
      let newTransformValue = prevTransformValue + stepWidth;

      if (-newTransformValue <= 0) {
        newTransformValue = prevTransformValue + (-prevTransformValue);
      }

      return newTransformValue;
    });
  };

  return (
    <div className="Carousel">
      <div className="Carousel__properties">
        <label className="Carousel__property" htmlFor="stepId">
          <p className="Carousel__property--title">
            Step:
          </p>
          <input
            type="number"
            id="stepId"
            className="Carousel__property--input"
            defaultValue={`${step}`}
            min="1"
            max="10"
            step="1"
            onChange={(event) => {
              setAppState({ step: +event.currentTarget.value });
              setTransformValue(0);
            }}
          />
        </label>

        <label className="Carousel__property" htmlFor="frameId">
          <p className="Carousel__property--title">
            Frame size:
          </p>
          <input
            type="number"
            id="frameId"
            className="Carousel__property--input"
            defaultValue={`${frameSize}`}
            min="1"
            max="10"
            step="1"
            onChange={(event) => {
              setAppState({ frameSize: +event.currentTarget.value });
              setTransformValue(0);
            }}
          />
        </label>

        <label className="Carousel__property" htmlFor="itemId">
          <p className="Carousel__property--title">
            Item width:
          </p>
          <input
            type="number"
            id="itemId"
            className="Carousel__property--input"
            defaultValue={`${itemWidth}`}
            min="100"
            max="400"
            step="10"
            onChange={(event) => {
              setAppState({ itemWidth: +event.currentTarget.value });
              setTransformValue(0);
            }}
          />
        </label>

        <label className="Carousel__property" htmlFor="animationId">
          <p className="Carousel__property--title">
            Animation duration:
          </p>
          <input
            type="number"
            id="animationId"
            className="Carousel__property--input"
            defaultValue={`${animationDuration}`}
            min="100"
            max="5000"
            step="50"
            onChange={(event) => setAppState(
              { animationDuration: +event.currentTarget.value },
            )}
          />
        </label>

        <label className="Carousel__property" htmlFor="infiniteId">
          <p className="Carousel__property--title">
            Infinite:
          </p>
          <input
            id="infiniteId"
            className="Carousel__property--input"
            type="checkbox"
            defaultValue={`${infinite}`}
            onClick={(event) => setAppState(
              { infinite: event.currentTarget.checked },
            )}
          />
        </label>
      </div>

      <div
        className="Carousel__images"
        style={{
          width: `${itemWidth * frameSize}px`,
          height: `${itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${itemWidth}px`,
            height: `${itemWidth}px`,
            transitionDuration: `${animationDuration}ms`,
            transform: `translateX(${transformValue}px)`,
            ...(infinite && {
              gridTemplateColumns:
                `repeat(${infiniteImages.length}, 1fr)`,
              animation:
                `carousel-movement
                ${animationDuration * 4}ms
                ease-in-out
                infinite
                alternate
                forwards`,
            }),
          }}
        >
          {imagesToRender.map((image, index) => (
            <li key={image}>
              <img
                className="Carousel__image"
                width={`${itemWidth}`}
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
                src={image}
                alt={`${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button"
          type="button"
          disabled={transformValue >= 0}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        <button
          className="Carousel__button"
          type="button"
          disabled={infinite || transformValue + totalWidth <= visibleFrame}
          onClick={handleNextClick}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
