import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const MAX_CONTAINER_WIDTH = 1300;

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

  const getMaxFrames = Math.floor(MAX_CONTAINER_WIDTH / itemWidth);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <label htmlFor="itemId" className="App__label">
        {'Item Width: '}
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          min={130}
          max={260}
          step={10}
          onChange={(event) => setItemWidth(Number(event.target.value))}
        />
      </label>

      <label htmlFor="frameId" className="App__label">
        {'Frame Size: '}
        <input
          type="number"
          id="frameId"
          value={frameSize}
          min={1}
          max={getMaxFrames}
          step={1}
          onChange={(event) => setFrameSize(Number(event.target.value))}
        />
      </label>

      <label htmlFor="stepId" className="App__label">
        {'Step: '}
        <input
          type="number"
          id="stepId"
          value={step}
          min={1}
          max={5}
          onChange={(event) => setStep(Number(event.target.value))}
        />
      </label>

      <label htmlFor="animationDurationId" className="App__label">
        {'Animation duration: '}
        <input
          type="number"
          id="animationDurationId"
          value={animationDuration}
          min={500}
          max={5000}
          step={500}
          onChange={(event) => setAnimationDuration(Number(event.target.value))}
        />
      </label>

      <label htmlFor="infiniteId" className="App__label">
        {'Infinite '}
        <input
          type="checkbox"
          id="infiniteId"
          onChange={() => setInfinite(!infinite)}
        />
      </label>
    </div>
  );
};

export default App;
