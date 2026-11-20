import React, { useState } from 'react';

import './App.scss';

import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <div className="App__controls">
        <label htmlFor="itemId">
          Width of each item:
          <input
            id="itemId"
            min={1}
            type="number"
            value={itemWidth}
            onChange={event => setItemWidth(Number(event.target.value))}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            min={1}
            max={10}
            type="number"
            value={frameSize}
            onChange={event => setFrameSize(Number(event.target.value))}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            min={1}
            type="number"
            value={step}
            onChange={event => setStep(Number(event.target.value))}
          />
        </label>

        <label htmlFor="anDurat">
          Animation Duration:
          <input
            id="anDurat"
            min={1}
            type="number"
            value={animationDuration}
            onChange={event => setAnimationDuration(Number(event.target.value))}
          />
        </label>

        <label htmlFor="isInfinite">
          Infinite:
          <input
            id="isInfinite"
            type="checkbox"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
      </div>

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
