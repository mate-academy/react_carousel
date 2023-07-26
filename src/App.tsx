import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

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
      <h1>Carousel with {images.length} images</h1>

      <div className="settings">
        <label htmlFor="imageSize">
          Adjust image size
          <input
            className="setting"
            id="imageSize"
            type="number"
            value={itemWidth}
            min={50}
            onChange={(event) => setItemWidth(+event.target.value)}
          />
        </label>

        <label htmlFor="step">
          Adjust scroll step
          <input
            className="setting"
            id="step"
            type="number"
            value={step}
            min={1}
            max={images.length - 1}
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label htmlFor="frameSize">
          Adjust frame size
          <input
            className="setting"
            id="frameSize"
            type="number"
            value={frameSize}
            min={1}
            max={images.length}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label htmlFor="scrollDuration">
          Adjust scroll duration
          <input
            className="setting"
            id="scrollDuration"
            type="number"
            value={animationDuration}
            min={0}
            onChange={(event) => setAnimationDuration(+event.target.value)}
          />
        </label>
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
