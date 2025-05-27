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

export const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="itemId">
        Item width:
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event => setItemWidth(Number(event.target.value))}
        />
      </label>

      <label htmlFor="frameId">
        Frame size
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event => setFrameSize(Number(event.target.value))}
        />
      </label>

      <label htmlFor="stepId">
        Step
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setStep(Number(event.target.value))}
        />
      </label>

      <label>
        Animation Duration
        <input
          type="number"
          value={animationDuration}
          onChange={event => setAnimationDuration(Number(event.target.value))}
        />
      </label>

      <button type="button" onClick={() => setInfinite(prev => !prev)}>
        Infinite
      </button>

      <Carousel
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
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
