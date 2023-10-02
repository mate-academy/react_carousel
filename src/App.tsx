import React, { useState } from 'react';

import { Carousel } from './components/Carousel';
import { DEFAULT, info } from './constants';

import './App.scss';

type Images = string[];

const images: Images = [
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png',
  './img/10.png',
];

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(DEFAULT.WIDTH);
  const [frameSize, setFrameSize] = useState(DEFAULT.FRAME_SIZE);
  const [step, setStep] = useState(DEFAULT.STEP);
  const [animationDuration, setAnimationDuration] = useState(DEFAULT.ANIMATION);
  const [infinite, setInfinite] = useState(DEFAULT.INFINITY);
  const [firstImage, setFirstImage] = useState(0);

  const handlerNextClick = () => {
    if (infinite && firstImage === images.length - frameSize) {
      return setFirstImage(0);
    }

    return setFirstImage((value) => (
      (value + step) <= (images.length - frameSize)
        ? value + step
        : images.length - frameSize
    ));
  };

  const handlerPrevClick = () => {
    if (infinite && firstImage === 0) {
      return setFirstImage(images.length - frameSize);
    }

    return setFirstImage((value) => (
      value - step >= 0
        ? value - step
        : 0
    ));
  };

  return (
    <div className="App">
      <h1 className="title" data-cy="title">Carousel</h1>

      <div className="container">
        <label htmlFor="itemWidth" className="label">
          <input
            type="number"
            name="itemWidth"
            id="itemWidth"
            className="input"
            max={info.maxWidth}
            min={info.minWidth}
            step={info.widthStep}
            defaultValue={DEFAULT.WIDTH}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setItemWidth(+event.target.value);
            }}
          />
          Item Width
        </label>
        <label htmlFor="frameSize" className="label">
          <input
            type="number"
            name="frameSize"
            id="frameSize"
            className="input"
            defaultValue={DEFAULT.FRAME_SIZE}
            min={info.minFrameSize}
            max={info.maxFrameSize}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFrameSize(+event.target.value);
            }}
          />
          Frame Size
        </label>
        <label htmlFor="step" className="label">
          <input
            type="number"
            name="step"
            id="step"
            className="input"
            defaultValue={DEFAULT.STEP}
            max={info.maxStep}
            min={info.minStep}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setStep(+event.target.value);
            }}
          />
          Step
        </label>
        <label htmlFor="animationDuration" className="label">
          <input
            type="number"
            name="animationDuration"
            id="animationDuration"
            className="input"
            defaultValue={DEFAULT.ANIMATION}
            step={info.animationDurationStep}
            max={info.maxAnimationDuration}
            min={info.minAnimationDuration}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnimationDuration(+event.target.value);
            }}
          />
          Animation Duration
        </label>
        <label htmlFor="infinite" className="label">
          <input
            type="checkbox"
            className=" input input--checkbox"
            onChange={() => {
              setInfinite(!infinite);
            }}
          />
          Infinitie
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        firstImage={firstImage}
        animationDuration={animationDuration}
      />

      <div className="container">
        <button
          type="button"
          className="button"
          disabled={firstImage === 0 && !infinite}
          onClick={handlerPrevClick}
        >
          Prev
        </button>

        <button
          type="button"
          className="button"
          data-cy="next"
          disabled={firstImage === images.length - frameSize && !infinite}
          onClick={handlerNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};
