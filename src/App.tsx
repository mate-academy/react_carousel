import React, { useState } from 'react';

import 'bulma';
import './App.scss';
import Carousel from './components/Carousel';

const images: string[] = [
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
  const [step, setStep] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [infinite, setInfinite] = useState<boolean>(false);

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setStep(value);
  };

  const handleFrameSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = +event.target.value;

    setFrameSize(value);
  };

  const handleItemWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = +event.target.value;

    setItemWidth(value);
  };

  const handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = +event.target.value;

    setAnimationDuration(value);
  };

  const handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfinite(event.target.checked);
  };

  return (
    <div className="app">
      <h1 data-cy="title" className="title app__title">
        Carousel with {images.length} images
      </h1>

      <section className="section">
        <div className="field">
          <label htmlFor="stepId" className="label">
            Step:
          </label>
          <div className="control">
            <input
              id="stepId"
              type="number"
              className="input"
              value={step}
              min="1"
              max={images.length}
              onChange={handleStepChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="frameId" className="label">
            Frame size:
          </label>
          <div className="control">
            <input
              id="frameId"
              type="number"
              className="input"
              value={frameSize}
              min="1"
              max={images.length}
              onChange={handleFrameSizeChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="itemId" className="label">
            Item width:
          </label>
          <div className="control">
            <input
              id="itemId"
              type="number"
              className="input"
              value={itemWidth}
              min="130"
              max="250"
              onChange={handleItemWidthChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="animationId" className="label">
            Animation duration:
          </label>
          <div className="control">
            <input
              id="animationId"
              type="number"
              className="input"
              value={animationDuration}
              min="1"
              max="10000"
              onChange={handleAnimationDurationChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label htmlFor="infiniteId" className="label checkbox">
              <input
                type="checkbox"
                id="infiniteId"
                onChange={handleInfiniteChange}
              />
              {'    Infinite'}
            </label>
          </div>
        </div>
      </section>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
