import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [state, setState] = useState({
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    currentIndex: 0,
  });

  const handleNext = () => {
    let newIndex = state.currentIndex + state.step;

    if (newIndex >= images.length - state.frameSize) {
      if (state.infinite) {
        newIndex = newIndex + state.frameSize - images.length;
      } else {
        newIndex = images.length - state.frameSize;
      }
    }

    setState((prevState) => ({
      ...prevState,
      currentIndex: newIndex,
    }));
  };

  const handlePrev = () => {
    let newIndex = state.currentIndex - state.step;

    if (newIndex < 0) {
      if (state.infinite) {
        newIndex = images.length - state.step;
      } else {
        newIndex = 0;
      }
    }

    setState((prevState) => ({
      ...prevState,
      currentIndex: newIndex,
    }));
  };

  const updateStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = +event.target.value;

    setState((prevState) => ({
      ...prevState,
      step: newStep,
    }));
  };

  const updateFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = +event.target.value;

    setState((prevState) => ({
      ...prevState,
      frameSize: newFrameSize,
    }));
  };

  const updateItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemWidth = +event.target.value;

    setState((prevState) => ({
      ...prevState,
      itemWidth: newItemWidth,
    }));
  };

  const updateAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAnimationDuration = +event.target.value;

    setState((prevState) => ({
      ...prevState,
      animationDuration: newAnimationDuration,
    }));
  };

  const updateInfinite = () => {
    setState((prevState) => ({
      ...prevState,
      infinite: !prevState.infinite,
    }));
  };

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
          style={{ width: `${state.itemWidth * state.frameSize}px` }}
        >
          <ul
            className="carousel__list"
            style={{
              transform: `translateX(${-state.currentIndex * state.itemWidth}px)`,
              transition: `transform ${state.animationDuration}s ease`,
            }}
          >
            {images.map((image: string, index: number) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`${index}`}
                  className="carousel__img"
                  style={{ width: `${state.itemWidth}px` }}
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
        {`Frame size is ${state.frameSize} `}
        <input
          type="range"
          min="2"
          max="5"
          value={state.frameSize}
          onChange={updateFrameSize}
        />
      </label>
      <label>
        {`Step number is ${state.step} `}
        <input
          type="range"
          min="2"
          max="5"
          value={state.step}
          onChange={updateStep}
        />
      </label>
      <label>
        {`Itemwidth is ${state.itemWidth} `}
        <input
          type="range"
          min="130"
          max="200"
          value={state.itemWidth}
          onChange={updateItemWidth}
        />
      </label>
      <label>
        {`Animation duration ${state.animationDuration}s `}
        <input
          type="range"
          min="1"
          max="3"
          value={state.animationDuration}
          onChange={updateAnimationDuration}
        />
      </label>
      <label>
        {'Infinite loop '}
        <input
          type="checkbox"
          onChange={updateInfinite}
          checked={state.infinite}
        />
      </label>
    </div>
  );
};
