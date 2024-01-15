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
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="App__settings Settings">
        <div className="Settings__elements">
          <label className="Settings__element-label">
            Item Width:
            <input
              className="Settings__element-input"
              type="number"
              min="130"
              max="260"
              step="10"
              value={itemWidth}
              onChange={(e) => {
                setItemWidth(+e.target.value);
              }}
            />
          </label>

          <label className="Settings__element-label">
            Frame Size:
            <input
              className="Settings__element-input"
              type="number"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={(e) => {
                setFrameSize(+e.target.value);
              }}
            />
          </label>

          <label className="Settings__element-label">
            Step:
            <input
              className="Settings__element-input"
              type="number"
              min="1"
              max={images.length}
              value={step}
              onChange={(e) => {
                setStep(+e.target.value);
              }}
            />
          </label>

          <label className="Settings__element-label">
            Animation Duration:
            <input
              className="Settings__element-input"
              type="number"
              min="0"
              max="5000"
              step="500"
              value={animationDuration}
              onChange={(e) => {
                setAnimationDuration(+e.target.value);
              }}
            />
          </label>

          <label className="Settings__element-label">
            Infinite:
            <input
              className="Settings__element-input"
              type="checkbox"
              onChange={() => setInfinite(!infinite)}
            />
          </label>
        </div>
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
