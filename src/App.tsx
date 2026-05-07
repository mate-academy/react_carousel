import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

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
            min={1}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            min={1}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            min={1}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label htmlFor="animationId">
          Animation Duration:
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            min={0}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
