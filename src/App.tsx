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

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title'>Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={3}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />

      <div className="App__settings">
        <label htmlFor="itemId">
          Enter item width
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            value={itemWidth}
            className="App__setting"
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          Enter frame size
          <input
            type="number"
            name="frameSize"
            id="frameId"
            value={frameSize}
            className="App__setting"
            min={1}
            max={images.length}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          Enter step
          <input
            type="number"
            name="step"
            id="stepId"
            value={step}
            className="App__setting"
            min={1}
            max={images.length - 1}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label htmlFor="animationId">
          Enter animation duration
          <input
            type="number"
            name="animationDuration"
            id="animationId"
            value={animationDuration}
            className="App__setting"
            min={0}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
