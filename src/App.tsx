import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const IMAGES = [
  './img/1.png', './img/2.png', './img/3.png', './img/4.png', './img/5.png',
  './img/6.png', './img/7.png', './img/8.png', './img/9.png', './img/10.png',
];

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <label htmlFor="itemId">
          Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label htmlFor="frameId">
          Frame:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label>
          Anim:
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
      </div>

      <Carousel
        images={IMAGES}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
