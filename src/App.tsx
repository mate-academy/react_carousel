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

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="form">
        <label htmlFor="stepId">How many to scroll:</label>
        <input
          id="stepId"
          className="input is-primary"
          type="number"
          placeholder="3"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
        <label htmlFor="frameId">Quantity of images:</label>
        <input
          id="frameId"
          className="input is-primary"
          type="number"
          placeholder="3"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />
        <label htmlFor="itemId">Item Width:</label>
        <input
          id="itemId"
          className="input is-primary"
          type="number"
          placeholder="130"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />
        <label htmlFor="animationDuration">Animation Duration:</label>
        <input
          id="animationDuration"
          className="input is-primary"
          type="number"
          placeholder="1000"
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
      />
    </div>
  );
};

export default App;
