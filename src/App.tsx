import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import {
  moveCarouselItemToPosition,
  MAX_ANIMATION_DURATION,
  MAX_FRAME_SIZE,
  MAX_ITEM_WIDTH,
} from './utils';

const images = [
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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const eventFrameSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFrameSize = Number(event.target.value);

    moveCarouselItemToPosition(0);
    setFrameSize(newFrameSize);

    if (step > newFrameSize) {
      setStep(newFrameSize);
    }
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <section className="input-section">
        <article className="input-section__article">
          <label
            htmlFor="step"
            className="input-section__label"
          >
            Step:
          </label>
          <input
            type="number"
            id="step"
            className="input-section__input"
            value={step}
            min="1"
            max={frameSize}
            onChange={(event) => {
              moveCarouselItemToPosition(0);
              setStep(Number(event.target.value));
            }}
          />
        </article>
        <article className="input-section__article">
          <label
            htmlFor="frameSize"
            className="input-section__label"
          >
            Frame Size:
          </label>
          <input
            type="number"
            id="frameSize"
            className="input-section__input"
            value={frameSize}
            min="1"
            max={MAX_FRAME_SIZE}
            onChange={eventFrameSizeChange}
          />
        </article>
        <article className="input-section__article">
          <label
            htmlFor="itemWidth"
            className="input-section__label"
          >
            Img Width:
          </label>
          <input
            type="number"
            id="itemWidth"
            className="input-section__input"
            value={itemWidth}
            min="100"
            max={MAX_ITEM_WIDTH}
            step={10}
            onChange={(event) => {
              moveCarouselItemToPosition(0);
              setItemWidth(Number(event.target.value));
            }}
          />
        </article>
        <article className="input-section__article">
          <label
            htmlFor="animationDuration"
            className="input-section__label"
          >
            Animation Duration:
          </label>
          <input
            type="number"
            id="animationDuration"
            className="input-section__input"
            value={animationDuration}
            min="100"
            max={MAX_ANIMATION_DURATION}
            step={100}
            onChange={(event) => {
              moveCarouselItemToPosition(0);
              setAnimationDuration(Number(event.target.value));
            }}
          />
        </article>
        <article className="input-section__article">
          <label
            htmlFor="step"
            className="input-section__label"
          >
            Infinite
          </label>
          <input
            type="checkbox"
            id="infinite"
            className="input-section__input"
            checked={infinite}
            onChange={(event) => {
              moveCarouselItemToPosition(0);
              setInfinite(event.target.checked);
            }}
          />
        </article>
      </section>
    </div>
  );
};
