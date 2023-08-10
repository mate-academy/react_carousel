import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
      <div className="inputs">
        <label>
          Step
          <input
            type="number"
            value={step}
            min="1"
            max="10"
            onChange={(e) => setStep(+e.target.value)}
          />
        </label>
        <label>
          FrameSize
          <input
            type="number"
            value={frameSize}
            min="1"
            max="10"
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </label>
        <label>
          ItemWidth
          <input
            type="number"
            value={itemWidth}
            min="50"
            max="200"
            onChange={(e) => setItemWidth(+e.target.value)}
          />
        </label>
        <label>
          Animation Duration
          <input
            type="number"
            value={animationDuration}
            min="500"
            max="3000"
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};
