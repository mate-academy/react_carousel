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
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <div className="input-container">
        <div className="input-wrapper">
          <label htmlFor="itemId">Item width</label>
          <input
            id="itemId"
            type="text"
            onChange={e => setItemWidth(+e.target.value)}
            value={itemWidth}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            type="text"
            onChange={e => setStep(+e.target.value)}
            value={step}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="frameId">Frame size</label>
          <input
            id="frameId"
            type="text"
            onChange={e => setFrameSize(+e.target.value)}
            value={frameSize}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="durationId">Animation duration</label>
          <input
            id="durationId"
            type="text"
            onChange={e => setAnimationDuration(+e.target.value)}
            value={animationDuration}
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
    </div>
  );
};

export default App;
