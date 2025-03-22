import React, { useState } from 'react';
import { Carousel } from './components/Carousel';
import './App.scss';

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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="itemId">
            Item Width (px):
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={e => setItemWidth(Number(e.target.value))}
              min="50"
              max="300"
            />
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={e => setFrameSize(Number(e.target.value))}
              min="1"
              max={images.length}
            />
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={e => setStep(Number(e.target.value))}
              min="1"
              max={frameSize}
            />
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="animationId">
            Animation Duration (ms):
            <input
              id="animationId"
              type="number"
              value={animationDuration}
              onChange={e => setAnimationDuration(Number(e.target.value))}
              min="0"
              max="5000"
            />
          </label>
        </div>

        <div className="control-group">
          <label htmlFor="infiniteId">
            <input
              id="infiniteId"
              type="checkbox"
              checked={infinite}
              onChange={e => setInfinite(e.target.checked)}
            />
            Infinite
          </label>
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};
