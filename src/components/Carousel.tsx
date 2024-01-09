import React, { useState } from 'react';
import './Carousel.scss';

type CarouselType = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<CarouselType> = ({
  images,
  step: propStep = 3,
  frameSize: propFrameSize = 3,
  itemWidth: propItemWidth = 130,
  animationDuration: propDuration = 1000,
  infinite,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [itemWidth, setItemWidth] = useState(propItemWidth);
  const [frameSize, setFrameSize] = useState(propFrameSize);
  const [step, setStep] = useState(propStep);
  const [animationDuration, setAnimationDuration] = useState(propDuration);

  const totalImages = images.length;

  const prevClick = () => {
    const newScrollPosition = Math.max(scrollPosition - step, 0);

    setScrollPosition(newScrollPosition);
  };

  const nextClick = () => {
    let newScrollPosition = scrollPosition + step;

    if (infinite) {
      newScrollPosition %= totalImages;
    } else {
      newScrollPosition = Math.min(newScrollPosition, totalImages - frameSize);
    }

    setScrollPosition(newScrollPosition);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line max-len
    setFunction: { (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (value: React.SetStateAction<number>): void; (arg0: number): void; },
  ) => {
    const newValue = parseInt(event.target.value, 10);

    setFunction(newValue);
  };

  const changeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, setItemWidth);
  };

  const changeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, setFrameSize);
  };

  const changeSteps = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, setStep);
  };

  const changeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event, setAnimationDuration);
  };

  return (
    <div
      className="Carousel"
      style={{
        width: `${frameSize * itemWidth}px`,
      }}
    >
      <div className="Carousel__frame">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${scrollPosition * itemWidth}px)`,
            transition: `transform ${animationDuration / 1000}s ease-in-out`,
          }}
        >
          {images.map((img, index) => (
            <li key={img}>
              <img
                src={img}
                alt={`${index + 1}`}
                style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Button">
        <button
          className="Button__left"
          type="button"
          onClick={prevClick}
          disabled={scrollPosition === 0}
        >
          &#11164;
        </button>
        <button
          className="Button__right"
          type="button"
          onClick={nextClick}
          disabled={scrollPosition >= totalImages - frameSize}
          data-cy="next"
        >
          &#11166;
        </button>
      </div>

      <div>
        <label htmlFor="itemWidthRange">itemWidth:</label>
        <input
          id="itemWidthRange"
          type="range"
          value={itemWidth}
          min={130}
          max={300}
          onChange={changeItemWidth}
        />
        <span>
          {itemWidth !== undefined ? itemWidth : 130}
          px
        </span>
      </div>

      <div>
        <label htmlFor="itemFrameSize ">frameSize:</label>
        <input
          id="itemFrameSize"
          type="range"
          value={frameSize}
          min={2}
          max={images.length}
          onChange={changeFrameSize}
        />
        <span>
          {frameSize !== undefined ? frameSize : 3}
        </span>
      </div>

      <div>
        <label htmlFor="itemSteps">step:</label>
        <input
          id="itemSteps"
          type="range"
          value={step}
          min={1}
          max={images.length}
          onChange={changeSteps}
        />
        <span>
          {step !== undefined ? step : 3}
        </span>
      </div>

      <div>
        <label htmlFor="animationDuration">animationDuration:</label>
        <input
          id="animationDuration"
          type="range"
          value={animationDuration}
          min={300}
          max={2500}
          onChange={changeDuration}
        />
        <span>
          {animationDuration !== undefined ? animationDuration : 1000}
        </span>
      </div>
    </div>
  );
};

export default Carousel;
