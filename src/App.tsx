import React, { useState, useEffect } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
  const [images] = useState([
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

  const [width, setWidth] = useState(130);
  const [size, setSize] = useState(3);
  const [step, setStep] = useState(3);
  const [duration, setDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  useEffect(() => {
    document.title = 'Carousel';
  }, []);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        itemWidth={width}
        frameSize={size}
        step={step}
        animationDuration={duration}
        infinite={isInfinite}
      />

      <div className="control-panel">
        <label htmlFor="stepId">
          Step:
          <input
            type="number"
            value={step}
            id="stepId"
            onChange={event => setStep(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="itemId">
          Width:
          <input
            type="number"
            value={width}
            id="itemId"
            onChange={event => setWidth(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="frameId">
          Size:
          <input
            type="number"
            value={size}
            id="frameId"
            onChange={event => setSize(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="fnimationDuration">
          Duration:
          <input
            type="number"
            value={duration}
            id="fnimationDuration"
            onChange={event => setDuration(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="infiniteId">
          Infinite:
          <input
            type="checkbox"
            checked={isInfinite}
            id="infiniteId"
            onChange={event => setIsInfinite(event.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};
