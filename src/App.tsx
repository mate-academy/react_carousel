import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(3000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="App__inputs">
        <label>
          Step:
          <input
            type="number"
            value={step}
            min={1}
            max={images.length}
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label>
          Frame size:
          <input
            type="number"
            value={frameSize}
            min={1}
            max={images.length}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label>
          Item width:
          <input
            type="number"
            value={itemWidth}
            min={130}
            onChange={(event) => setItemWidth(+event.target.value)}
          />
        </label>

        <label>
          Animation duration:
          <input
            type="number"
            value={animationDuration}
            min={3000}
            onChange={(event) => setAnimationDuration(+event.target.value)}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={(event) => setInfinite(!!event.target.checked)}
          />
        </label>
      </div>

    </div>
  );
};
