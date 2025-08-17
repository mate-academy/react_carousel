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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title'>Carousel with {images.length} images</h1>
      <div className="form">
        <label className="form__label" htmlFor="itemId">
          Item Width:
        </label>
        <input
          id="itemId"
          data-cy="itemId"
          type="text"
          value={itemWidth}
          onChange={e => setItemWidth(+e.target.value)}
        />

        <label className="form__label" htmlFor="frameId">
          Frame size:
        </label>
        <input
          id="frameId"
          data-cy="frameId"
          type="text"
          value={frameSize}
          onChange={e => setFrameSize(+e.target.value)}
        />

        <label className="form__label" htmlFor="stepId">
          Step:
        </label>
        <input
          id="stepId"
          data-cy="stepId"
          type="text"
          value={step}
          onChange={e => setStep(+e.target.value)}
        />

        <label className="form__label" htmlFor="animation-duration">
          Animation duration:
        </label>
        <input
          id="animation-duration"
          type="text"
          value={animationDuration}
          onChange={e => setAnimationDuration(+e.target.value)}
        />
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
