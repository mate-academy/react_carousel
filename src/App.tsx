import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Options } from './components/Options/Options';

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

const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1
        data-cy="title"
      >
        Carousel with
        {images.length}
        images
      </h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <Options
        itemWidth={itemWidth}
        setItemWidth={setItemWidth}
        frameSize={frameSize}
        setFrameSize={setFrameSize}
        images={images}
        step={step}
        setStep={setStep}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
        setInfinite={setInfinite}
      />
    </div>
  );
};

export default App;
