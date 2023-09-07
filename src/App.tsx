import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
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

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrameSize(+event.target.value);
  };

  const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnimationDuration(+event.target.value);
  };

  const handleInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfinite(!!event.target.checked);
  };

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        Carousel with
        {' '}
        {state.images.length}
        {' '}
        images
      </h1>
      <div className="App__inputs">
        <label>
          Step:
          <input
            type="number"
            value={step}
            min={1}
            max={10}
            onChange={handleStep}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            min={1}
            max={state.images.length}
            onChange={handleFrameSize}
          />
        </label>

        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            onChange={handleItemWidth}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            min={1000}
            max={3000}
            value={animationDuration}
            onChange={handleAnimationDuration}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={handleInfinite}
          />
        </label>
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
