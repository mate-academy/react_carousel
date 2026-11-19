import React, { useState } from 'react';
import { Carousel } from './components/Carousel';
import './App.scss';

const IMAGES = [
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
          Item Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            step={10}
            min={50}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            min={1}
            max={IMAGES.length}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            min={1}
            max={IMAGES.length}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label htmlFor="durationId">
          Animation Duration (ms):
          <input
            id="durationId"
            type="number"
            value={animationDuration}
            step={100}
            min={0}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>

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
        images={IMAGES}
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
