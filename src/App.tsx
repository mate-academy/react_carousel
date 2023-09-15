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
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
      <label htmlFor="itemId" className="label">
        Item Width:
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          min={130}
          max={260}
          step={10}
          onChange={(event) => setItemWidth(+event.target.value)}
        />
      </label>
      <label htmlFor="frameId" className="label">
        Frame Size:
        <input
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={images.length}
          step={1}
          onChange={(event) => setFrameSize(+event.target.value)}
        />
      </label>
      <label htmlFor="stepId" className="label">
        Step:
        <input
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={images.length}
          step={1}
          onChange={(event) => setStep(+event.target.value)}
        />
      </label>
      <label htmlFor="animationId" className="label">
        AnimationDuration:
        <input
          type="number"
          id="animationId"
          value={animationDuration}
          min={500}
          max={5000}
          step={500}
          onChange={(event) => setAnimationDuration(+event.target.value)}
        />
      </label>
      <label htmlFor="infinityId" className="label">
        Infinite:
        <input
          type="checkbox"
          id="infinityId"
          onChange={() => setInfinite(!infinite)}
        />
      </label>
    </div>
  );
};

export default App;
