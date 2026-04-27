import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      {/* eslint-disable-next-line */}
      <label htmlFor="itemId">
        <input
          id="itemId"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />
      </label>
      {/* eslint-disable-next-line */}
      <label htmlFor="frameId">
        <input
          id="frameId"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />
      </label>
      <label htmlFor="stepId">
        {' '}
        <input
          id="stepId"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
      </label>
      {/* eslint-disable-next-line */}
      <label htmlFor="animationId">
        <input
          id="animationId"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />
      </label>
      <input
        type="checkbox"
        checked={infinite}
        onChange={e => setInfinite(e.target.checked)}
      />

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
