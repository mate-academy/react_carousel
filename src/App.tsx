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

const info = {
  minWidth: 130,
  maxWidth: 1300,
  widthStep: 10,
  minFrameSize: 1,
  maxFrameSize: 10,
  minStep: 1,
  maxStep: 5,
  animationDurationStep: 10,
};

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <form method="post" className="App__form">
        <label htmlFor="itemId">
          ITEM WIDTH:
          <input
            id="itemId"
            type="number"
            name="itemWidth"
            min={info.minWidth}
            max={info.maxWidth}
            step={info.widthStep}
            value={itemWidth}
            onChange={event => setItemWidth(+event.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          FRAME SIZE:
          <input
            id="frameId"
            type="number"
            name="frameSize"
            min={info.minFrameSize}
            max={info.maxFrameSize}
            step={info.minStep}
            value={frameSize}
            onChange={event => setFrameSize(+event.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          STEP:
          <input
            id="stepId"
            type="number"
            name="step"
            min={info.minStep}
            max={info.maxStep}
            step={info.minStep}
            value={step}
            onChange={event => setStep(+event.target.value)}
          />
        </label>

        <label htmlFor="animationDurationId">
          ANIMATION DURATION:
          <input
            id="animationDurationId"
            type="number"
            name="animationDuration"
            step={info.animationDurationStep}
            value={animationDuration}
            onChange={event => setAnimationDuration(+event.target.value)}
          />
        </label>

        <label htmlFor="infiniteId">
          INFINITE:
          <input
            id="infiniteId"
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
      </form>

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
