import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
  const images = [
    '../img/1.png',
    '../img/2.png',
    '../img/3.png',
    '../img/4.png',
    '../img/5.png',
    '../img/6.png',
    '../img/7.png',
    '../img/8.png',
    '../img/9.png',
    '../img/10.png',
  ];
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label>
        Step
        <input
          type="text"
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
      </label>
      <br />
      <label>
        FrameSize
        <input
          type="text"
          value={frameSize}
          onChange={(e) => setFrameSize(+e.target.value)}
        />
      </label>
      <br />
      <label>
        ItemWidth
        <input
          type="text"
          value={itemWidth}
          onChange={(e) => setItemWidth(+e.target.value)}
        />
      </label>
      <br />
      <label>
        Animation Duration
        <input
          type="text"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(+e.target.value)}
        />
      </label>
      <br />

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
