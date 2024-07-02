/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__input-container">
        <label htmlFor="itemId">Item width</label>
        <input
          type="number"
          id="itemId"
          value={itemWidth}
          onChange={event => setItemWidth(+event.target.value)}
          min={1}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          type="number"
          id="frameId"
          value={frameSize}
          onChange={event => setFrameSize(+event.target.value)}
          min={1}
          max={10}
        />

        <label htmlFor="stepId">Step</label>
        <input
          type="number"
          id="stepId"
          value={step}
          onChange={event => setStep(+event.target.value)}
          min={1}
          max={10}
        />

        <label htmlFor="animationDuration">Animation duration</label>
        <input
          type="number"
          name="animationDuration"
          value={animationDuration}
          onChange={event => setAnimationDuration(+event.target.value)}
        />

        <label className="App__input-container__infinite" htmlFor="infinite">
          Infinite
        </label>
        <input
          type="checkbox"
          name="infinite"
          checked={infinite}
          onChange={event => setInfinite(event.target.checked)}
        />
      </div>

      <Carousel
        images={images}
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
