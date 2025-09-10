import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value);
  };

  const handleFrameSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFrameSize(+event.target.value);
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const handleAnimationDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnimationDuration(+event.target.value);
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="inputs">
        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          value={itemWidth}
          onChange={handleWidthChange}
          type="number"
        />

        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          value={frameSize}
          onChange={handleFrameSizeChange}
          type="number"
        />

        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          value={step}
          onChange={handleStepChange}
          type="number"
        />

        <label htmlFor="animationDuration">Animation duration:</label>
        <input
          id="animationDuration"
          value={animationDuration}
          onChange={handleAnimationDurationChange}
          type="number"
        />
      </div>

      <Carousel
        animationDuration={animationDuration}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        images={images}
      />
    </div>
  );
};
