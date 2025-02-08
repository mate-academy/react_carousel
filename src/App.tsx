import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { useState } from 'react';

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

  const [currentWidth, setWidth] = useState(130);
  const [currentFrameSize, setFrameSize] = useState(3);
  const [currentStep, setStep] = useState(3);
  const [currentDuration, setDuration] = useState(1000);

  return (
    <div className="App">
      <input
        value={currentWidth}
        type="number"
        placeholder="item Width"
        onChange={e => setWidth(Number(e.target.value)) || 0}
      />
      <input
        value={currentFrameSize}
        type="number"
        placeholder="Frame Size"
        onChange={e => setFrameSize(Number(e.target.value))}
      />
      <input
        value={currentStep}
        type="number"
        placeholder="step"
        onChange={e => setStep(Number(e.target.value))}
      />
      <input
        value={currentDuration}
        type="number"
        placeholder="animation duration"
        onChange={e => setDuration(Number(e.target.value))}
      />
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        itemWidth={currentWidth}
        frameSize={currentFrameSize}
        step={currentStep}
        animationDuration={currentDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
