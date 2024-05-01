import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

export const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemwidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const state: State = {
    images: [
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
    ],
  };

  const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value);

    if (!isNaN(width)) {
      setItemwidth(width);
    }
  };

  const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value);

    if (!isNaN(size)) {
      setFrameSize(size);
    }
  };

  const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const steps = parseInt(event.target.value);

    if (!isNaN(steps)) {
      setStep(steps);
    }
  };

  const handleAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value);

    if (!isNaN(value)) {
      setAnimationDuration(value);
    }
  };

  const handleInfinity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    setInfinite(value);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className="App__title" data-cy="title">
        Carousel with {state.images.length} images
      </h1>

      <div className="App__container">
        <div className="App__container--element">
          <label className="App__container-lable" htmlFor="itemId">
            Item width:{' '}
          </label>
          <input
            id="itemId"
            name="itemId"
            type="number"
            min="50"
            max="350"
            onChange={handleItemWidth}
            defaultValue={itemWidth}
            className="App__container-input"
          />
        </div>
        <div className="App__container--element">
          <label className="App__container-lable" htmlFor="frameId">
            Frame Size:{' '}
          </label>
          <input
            id="frameId"
            name="frameSize"
            type="number"
            min="1"
            max={state.images.length}
            onChange={handleFrameSize}
            defaultValue={frameSize}
            className="App__container-input"
          />
        </div>
        <div className="App__container--element">
          <label className="App__container-lable" htmlFor="stepId">
            Step:{' '}
          </label>
          <input
            id="stepId"
            name="step"
            type="number"
            min="1"
            max={state.images.length}
            onChange={handleStep}
            defaultValue={step}
            className="App__container-input"
          />
        </div>
        <div className="App__container--element">
          <label className="App__container-lable" htmlFor="animationnId">
            Animation Duration:{' '}
          </label>
          <input
            id="animationnId"
            name="animationDuration"
            type="number"
            min="500"
            step="100"
            max="3000"
            onChange={handleAnimationDuration}
            defaultValue={animationDuration}
            className="App__container-input"
          />
        </div>
        <div className="App__container--element">
          <label className="App__container-lable" htmlFor="infiniteId">
            Infinite:{' '}
          </label>
          <input
            id="infiniteId"
            name="infinite"
            type="checkbox"
            onChange={handleInfinity}
            checked={infinite}
            className="App__container-input"
          />
        </div>
      </div>

      <Carousel
        images={state.images}
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
