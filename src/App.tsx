import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
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

  const handleItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemWidth(+event.target.value > 0 ? +event.target.value : 1);
  };

  const handleFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrameSize(+event.target.value > 0 ? +event.target.value : 1);
  };

  const handleStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value > 0 ? +event.target.value : 1);
  };

  const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(+event.target.value > 0 ? +event.target.value : 1);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__settings">
        <p className="App__settings--title">Item Width</p>
        <input
          type="number"
          className="App__settings--params"
          value={itemWidth}
          onChange={handleItemWidth}
        />

        <p className="App__settings--title">Frame Size</p>
        <input
          type="number"
          className="App__settings--params"
          value={frameSize}
          onChange={handleFrameSize}
        />

        <p className="App__settings--title">Step</p>
        <input
          type="number"
          className="App__settings--params"
          value={step}
          onChange={handleStep}
        />

        <p className="App__settings--title">Animation Duration</p>
        <input
          type="number"
          className="App__settings--params"
          value={animationDuration}
          onChange={handleDuration}
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
