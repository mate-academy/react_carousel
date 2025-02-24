import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="itemId">Item width</label>
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        onChange={e => setItemWidth(+e.target.value)}
      />

      <label htmlFor="frameId">Frame size</label>
      <input
        id="frameId"
        type="number"
        value={frameSize}
        onChange={e => setFrameSize(+e.target.value)}
      />

      <label htmlFor="stepId">Step</label>
      <input
        id="stepId"
        type="number"
        value={step}
        onChange={e => setStep(+e.target.value)}
      />

      <label htmlFor="animationId">Animation Duration</label>
      <input
        id="animationId"
        type="number"
        value={animationDuration}
        onChange={e => setAnimationDuration(+e.target.value)}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};
