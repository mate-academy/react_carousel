import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { useState } from 'react';

const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130); //
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3); //
  const [animationDuration, setAnimationDuration] = useState(1000); //
  const [infinite, setInfinite] = useState(false); //

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel</h1>

      <div className="App__controls">
        <label htmlFor="itemId">
          Width of each item:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>
        <br />
        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>
        <br />
        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>
        <br />
        <label htmlFor="animationDurationId">
          Animation Duration:
          <input
            id="animationDuration"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
        <br />
        <label htmlFor="infiniteId">
          Infinite:
          <input
            id="infiniteId"
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
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
