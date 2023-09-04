import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
}

const Carousel: React.FC<Props> = ({
  images, step, frameSize, itemWidth, animationDuration,
}) => {
  const [currentSmile, setCurrentSmile] = useState(0);
  const [smileWidth, setSmileWidth] = useState(itemWidth);
  const [amountSteps, setAmountSteps] = useState(step);
  const [amountImages, setAmountImages] = useState(frameSize);
  const [animationTime, setAnimationTime] = useState(animationDuration);

  const endOfList
    = -(+smileWidth * (images.length - amountImages - amountSteps));
  const beginOfList = -(+smileWidth * amountSteps);

  function slideForward(): void {
    if (currentSmile > -(+smileWidth * (images.length - amountImages))) {
      setCurrentSmile(currentSmile - (+smileWidth * amountSteps));
    }

    if (currentSmile >= -(+smileWidth * images.length)
      && currentSmile <= endOfList) {
      setCurrentSmile(-(+smileWidth * (images.length - amountImages)));
    }
  }

  function slideBack() {
    if (currentSmile >= -(+smileWidth * amountSteps)) {
      setCurrentSmile(0);
    }

    if (currentSmile >= -(+smileWidth * images.length)
      && currentSmile <= beginOfList) {
      setCurrentSmile(currentSmile + (+smileWidth * amountSteps));
    }
  }

  return (
    <div
      className="Carousel"
      style={{
        width: `${+smileWidth * amountImages}px`,
        transition: `all ${animationDuration / 1000}s ease-in`,
      }}
    >
      <ul className="Carousel__list">
        {images.map((img, indexImg) => (
          <li
            key={img}
          >
            <img
              src={img}
              alt={`${indexImg}`}
              className="Carousel--item"
              style={{
                width: `${smileWidth}px`,
                transform: `translate(${currentSmile}px)`,
                transition: `all ${animationTime / 1000}s ease-in`,
              }}
            />
          </li>
        ))}
      </ul>

      <label htmlFor="width">
        Width:
        <input
          type="number"
          id="width"
          min="130"
          max="390"
          step="10"
          value={`${smileWidth}`}
          onChange={event => {
            setSmileWidth(+event.target.value);
            setCurrentSmile(0);
          }}
        />
      </label>

      <label htmlFor="step">
        Step:
        <input
          type="number"
          id="step"
          min="1"
          max={images.length - 1}
          value={`${amountSteps}`}
          onChange={event => setAmountSteps(+event.target.value)}
        />
      </label>

      <label htmlFor="frame-size">
        Frame size:
        <input
          type="number"
          id="frame-size"
          min="1"
          max={images.length - 1}
          value={`${amountImages}`}
          onChange={event => {
            setAmountImages(+event.target.value);
            setCurrentSmile(0);
          }}
        />
      </label>

      <label htmlFor="animation-duration">
        Animation duration:
        <input
          type="number"
          id="animation-duration"
          min="1000"
          max="5000"
          step="1000"
          value={`${animationTime}`}
          onChange={event => setAnimationTime(+event.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={slideBack}
      >
        Prev
      </button>

      <button
        type="button"
        onClick={slideForward}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
