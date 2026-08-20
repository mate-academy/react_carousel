import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

function App() {
  const [images] = useState<string[]>([
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
  ]);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="App__controls">
        <div className="form-group">
          <label htmlFor="itemId">Item width:</label>
          <input
            type="number"
            id="itemId"
            data-cy="itemId"
            value={itemWidth}
            min={130}
            max={300}
            step={1}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="frameId">Frame size:</label>
          <input
            type="number"
            id="frameId"
            data-cy="frameId"
            value={frameSize}
            min={1}
            max={10}
            step={1}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            id="stepId"
            data-cy="stepId"
            value={step}
            min={1}
            max={10}
            step={1}
            onChange={e => setStep(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="animationId">Animation duration:</label>
          <input
            type="number"
            id="animationId"
            data-cy="animationId"
            value={animationDuration}
            min={0}
            step={100}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="infiniteId">Infinite:</label>
          <input
            type="checkbox"
            id="infiniteId"
            data-cy="infiniteId"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
