import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const initialImages = [
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
  const [images] = useState<string[]>(initialImages);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [infinite, setInfinite] = useState<boolean>(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form
        className="App__controls controls"
        onSubmit={e => e.preventDefault()}
      >
        <label className="controls__field" htmlFor="itemId">
          <span className="controls__label">Item Width (px):</span>
          <input
            id="itemId"
            className="controls__input"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label className="controls__field" htmlFor="frameId">
          <span className="controls__label">Frame Size:</span>
          <input
            id="frameId"
            className="controls__input"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>

        <label className="controls__field" htmlFor="stepId">
          <span className="controls__label">Step:</span>
          <input
            id="stepId"
            className="controls__input"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label className="controls__field" htmlFor="durationId">
          <span className="controls__label">Animation Duration (ms):</span>
          <input
            id="durationId"
            className="controls__input"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>

        <label
          className="controls__field controls__field--checkbox"
          htmlFor="infiniteId"
        >
          <span className="controls__label">Infinite:</span>
          <input
            id="infiniteId"
            className="controls__input"
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </label>
      </form>

      <Carousel
        animationDuration={animationDuration}
        frameSize={frameSize}
        images={images}
        infinite={infinite}
        itemWidth={itemWidth}
        step={step}
      />
    </div>
  );
};

export default App;
