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
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__settings">
        <label htmlFor="itemId">
          Item width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            step={10}
            onChange={event => setItemWidth(Number(event.target.value))}
          />
        </label>

        <label htmlFor="frameId">
          Frame size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            min="1"
            max={images.length}
            onChange={event => setFrameSize(Number(event.target.value))}
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            min="1"
            onChange={event => setStep(Number(event.target.value))}
          />
        </label>

        <label htmlFor="durationId">
          Animation duration:
          <input
            id="durationId"
            type="number"
            value={animationDuration}
            step="100"
            onChange={event => setAnimationDuration(Number(event.target.value))}
          />
        </label>

        <label htmlFor="infiniteId">
          Infinite:
          <input
            id="infiniteId"
            type="checkbox"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
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

export default App;
