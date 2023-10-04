import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App = () => {
  const state = {
    images: [
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
    ],
  };

  const { images } = state;

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleStepItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrameSize(+event.target.value);
  };

  const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleAnimationDuration = (event:
  React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(+event.target.value);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
      <div className="inputs">
        <label htmlFor="stepId">
          Step:
          <input
            id="stepId"
            className="inputs__item"
            type="number"
            min="1"
            max="5"
            step="1"
            value={step}
            onChange={handleStepItem}
          />
        </label>
        <label htmlFor="frameId">
          Frame size:
          <input
            id="frameId"
            className="inputs__item"
            type="number"
            min="1"
            max="10"
            step="1"
            value={frameSize}
            onChange={handleFrameSize}
          />
        </label>
        <label htmlFor="itemId">
          Item width:
          <input
            id="itemId"
            className="input"
            type="number"
            min="130"
            max="180"
            step="10"
            value={itemWidth}
            onChange={handleItemWidth}
          />
        </label>
        <label htmlFor="animationDuration">
          Animation duration:
          <input
            id="animationDuration"
            className="inputs__item"
            type="number"
            step="10"
            value={animationDuration}
            onChange={handleAnimationDuration}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
