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

  const [currentItemWidth, setItemWidth] = useState(130);
  const [currentFrameSize, setFrameSize] = useState(3);
  const [currentStep, setStep] = useState(3);
  const [currentAnimationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="data">
        <label htmlFor="itemId">
          Item width:
          <input
            type="number"
            id="itemId"
            min="1"
            value={currentItemWidth}
            onChange={event => setItemWidth(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="frameId">
          Frame Size:
          <input
            type="number"
            id="frameId"
            min="1"
            max={images.length}
            value={currentFrameSize}
            onChange={event => setFrameSize(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            type="number"
            id="stepId"
            min="1"
            max={images.length}
            value={currentStep}
            onChange={event => setStep(Number(event.target.value))}
          ></input>
        </label>

        <label htmlFor="durationId">
          Animation duration:
          <input
            type="number"
            id="durationId"
            value={currentAnimationDuration}
            onChange={event => setAnimationDuration(Number(event.target.value))}
          ></input>
        </label>
      </div>

      <Carousel
        images={images}
        step={currentStep}
        frameSize={currentFrameSize}
        itemWidth={currentItemWidth}
        animationDuration={currentAnimationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
