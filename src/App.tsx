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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <div className="App__controls">
        <div className="App__field">
          <label htmlFor="itemId">Item Width</label>
          <input
            id="itemId"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </div>
        <div className="App__field">
          <label htmlFor="frameId">Frame Size</label>
          <input
            id="frameId"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </div>
        <div className="App__field">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </div>
        <div className="App__field">
          <label htmlFor="animationId">Animation Duration</label>
          <input
            id="animationId"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </div>
      </div>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
    </div>
  );
};

export default App;
