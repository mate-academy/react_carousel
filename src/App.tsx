import React, { useState, useEffect } from 'react';
import './App.scss';
import Carousel from './Carousel';

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

  useEffect(() => {
    document.title = `Carousel with ${images.length} images`;
  }, []);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="controls">
        <label>
          Item width (px):
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label>
          Frame size:
          <input
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
            max={images.length}
          />
        </label>

        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label>
          Animation duration (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
      </div>

      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};
