import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { Inputs } from './components/Inputs/Inputs';

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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className="App__header" data-cy="title">Carousel with {images.length} images</h1>

      <Inputs
        setStep={setStep}
        setFrameSize={setFrameSize}
        setItemWidth={setItemWidth}
        setAnimationDuration={setAnimationDuration}
        infinite={infinite}
        setInfinite={setInfinite}
      />

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};
