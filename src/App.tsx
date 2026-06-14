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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <div>
        <label htmlFor="itemId">itemWidth</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event => setItemWidth(Number(event.target.value))}
        />

        <label htmlFor="frameId">frameSize</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event => setFrameSize(Number(event.target.value))}
        />

        <label htmlFor="stepId">step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setStep(Number(event.target.value))}
        />

        <label htmlFor="animationId">animationDuration</label>
        <input
          id="animationId"
          type="number"
          value={animationDuration}
          // eslint-disable-next-line prettier/prettier
          onChange={event => setAnimationDuration(Number(event.target.value))}
        />
      </div>

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

export default App;
