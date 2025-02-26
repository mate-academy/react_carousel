import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);

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
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="stepId">
          Step ID:
          <input
            type="number"
            id="stepId"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>
        <label htmlFor="itemId">
          Item ID:
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>
        <label htmlFor="frameId">
          Frame ID:
          <input
            type="number"
            id="frameId"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>
      </div>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={1000}
        infinite={false}
        key={`${step}-${frameSize}-${itemWidth}`}
      />
    </div>
  );
};

export default App;
