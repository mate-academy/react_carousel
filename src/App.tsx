import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

      <div>
        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />

        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />

        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />

        <label htmlFor="durationId">Animation duration (ms):</label>
        <input
          id="durationId"
          type="number"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
