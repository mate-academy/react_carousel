import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App: React.FC = () => {
  const [images] = useState<string[]>([
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
  ]);

  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="itemId">
        Item Width:
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => {
            setItemWidth(Number(e.target.value));
          }}
        />
      </label>

      <label htmlFor="frameId">
        Frame Width:
        <input
          id="frameId"
          type="number"
          value={frameSize}
          max={images.length}
          onChange={e => {
            setFrameSize(Number(e.target.value));
          }}
        />
      </label>

      <label htmlFor="stepId">
        Steps:
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => {
            setStep(Number(e.target.value));
          }}
        />
      </label>

      <label htmlFor="animationDurationId">
        Animation Duration Time:
        <input
          id="animationDurationId"
          type="number"
          value={animationDuration}
          onChange={e => {
            setAnimationDuration(Number(e.target.value));
          }}
        />
      </label>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};
