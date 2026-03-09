import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      <h1 data-cy="title" className="app__title">
        {`Carousel`}
      </h1>

      <div className="app__controls">
        <label className="app__label" htmlFor="itemId">
          Item Width (px)
          <input
            id="itemId"
            className="app__input"
            type="number"
            min={50}
            max={400}
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label className="app__label" htmlFor="frameId">
          Frame Size
          <input
            id="frameId"
            className="app__input"
            type="number"
            min={1}
            max={IMAGES.length}
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>

        <label className="app__label" htmlFor="stepId">
          Step
          <input
            id="stepId"
            className="app__input"
            type="number"
            min={1}
            max={IMAGES.length}
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label className="app__label" htmlFor="animationId">
          Animation Duration (ms)
          <input
            id="animationId"
            className="app__input"
            type="number"
            min={100}
            max={5000}
            step={100}
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>

        <label className="app__label app__label--checkbox">
          Infinite
          <input
            className="app__checkbox"
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </label>
      </div>

      <Carousel
        images={IMAGES}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
