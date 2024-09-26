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
const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [step, setStep] = useState(3);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="stepId">
        Step:
        <input
          id="stepId"
          type="number"
          min={1}
          max={images.length}
          value={step}
          onChange={e => setStep(+e.target.value)}
        />
      </label>
      <label htmlFor="itemId">
        Item width:
        <input
          id="itemId"
          type="number"
          min={130}
          max={260}
          value={itemWidth}
          onChange={e => setItemWidth(+e.target.value)}
        />
      </label>
      <label>
        Animation duration:
        <input
          type="number"
          min={0}
          max={3000}
          value={animationDuration}
          onChange={e => setAnimationDuration(+e.target.value)}
        />
      </label>
      <label htmlFor="frameId">
        Frame size:
        <input
          id="frameId"
          type="number"
          min={1}
          max={images.length}
          value={frameSize}
          onChange={e => setFrameSize(+e.target.value)}
        />
      </label>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        animationDuration={animationDuration}
        step={step}
      />
    </div>
  );
};

export default App;
