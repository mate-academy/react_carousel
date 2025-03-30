import React, { useState, useEffect } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC<State> = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
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

  useEffect(() => {
    document.title = 'Carousel';
  }, []);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="controls">
        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setItemWidth(Number(e.target.value));
            }}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFrameSize(Number(e.target.value));
            }}
          />
        </label>

        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStep(Number(e.target.value));
            }}
          />
        </label>
        <label>
          Animation Duration (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAnimationDuration(Number(e.target.value));
            }}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
