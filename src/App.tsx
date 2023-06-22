import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

const images: string[] = [
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
  const [step, setStep] = useState(1);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>
      <form action="/" method="POST">
        <label className="label" htmlFor="itemId">Item Width:</label>
        <input
          className="input"
          type="number"
          id="itemId"
          name="itemWidth"
          step="10"
          value={itemWidth}
          onChange={(event) => {
            setItemWidth(+event.target.value);
          }}
        />
        <label className="label" htmlFor="frameSize">Frame Size:</label>
        <input
          className="input"
          type="number"
          id="frameSize"
          name="frameSize"
          min="1"
          max="10"
          value={frameSize}
          onChange={(event) => {
            setFrameSize(+event.target.value);
          }}
        />
        <label className="label" htmlFor="step">Step:</label>
        <input
          className="input"
          type="number"
          id="step"
          name="step"
          min="1"
          max="10"
          value={step}
          onChange={(event) => {
            setStep(+event.target.value);
          }}
        />
        <label className="label" htmlFor="duration">Animation duration:</label>
        <input
          className="input"
          type="number"
          id="duration"
          name="duration"
          step="100"
          value={animationDuration}
          onChange={(event) => {
            setAnimationDuration(+event.target.value);
          }}
        />
      </form>

      <Carousel
        images={images}
        width={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};
