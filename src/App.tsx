import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="itemId">
        Item width
        <input
          id="itemId"
          required
          type="number"
          min={1}
          value={itemWidth}
          onChange={changeEvent => {
            if (changeEvent.target.validity.valid) {
              setItemWidth(Number(changeEvent.target.value));
            }
          }}
        ></input>
      </label>
      <label htmlFor="frameId">
        Frame size
        <input
          id="frameId"
          required
          type="number"
          min={1}
          max={images.length}
          value={frameSize}
          onChange={changeEvent => {
            if (changeEvent.target.validity.valid) {
              setFrameSize(Number(changeEvent.target.value));
            }
          }}
        ></input>
      </label>
      <label htmlFor="stepId">
        Step size
        <input
          id="stepId"
          required
          type="number"
          min={1}
          value={step}
          onChange={changeEvent => {
            if (changeEvent.target.validity.valid) {
              setStep(Number(changeEvent.target.value));
            }
          }}
        ></input>
      </label>
      <label>
        Animation duration
        <input
          required
          type="number"
          min={0}
          value={animationDuration}
          onChange={changeEvent => {
            if (changeEvent.target.validity.valid) {
              setAnimationDuration(Number(changeEvent.target.value));
            }
          }}
        ></input>
      </label>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
