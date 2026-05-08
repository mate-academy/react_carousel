import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [isInfinite, setIsInfinite] = useState(false);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const [images] = useState<string[]>([
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
  ]);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <fieldset className="settings">
        <legend>Carousel settings</legend>

        <label htmlFor="stepId">
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
          Step
        </label>

        <label htmlFor="itemId">
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
          Item width
        </label>

        <label htmlFor="frameId">
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
          Visible slides
        </label>

        <label htmlFor="animationId">
          <input
            id="animationId"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
          Animation duration
        </label>

        <label htmlFor="infiniteId">
          <input
            id="infiniteId"
            type="checkbox"
            checked={isInfinite}
            onChange={e => setIsInfinite(e.target.checked)}
          />
          Infinity loop
        </label>
      </fieldset>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={isInfinite}
      />
    </div>
  );
};

export default App;
