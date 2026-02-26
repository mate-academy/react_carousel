import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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
  const [infinite, setInfinite] = useState<boolean>(false);
  const handleNumber = (setter: (v: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      if (Number.isNaN(value)) {
        return;
      }

      setter(value);
    };
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="controls">
        <label>
          Item width
          <input
            type="number"
            min={1}
            value={itemWidth}
            onChange={handleNumber(setItemWidth)}
          />
        </label>
        <label>
          Frame size
          <input
            type="number"
            min={1}
            value={frameSize}
            onChange={handleNumber(setFrameSize)}
          />
        </label>
        <label>
          Step
          <input
            type="number"
            min={1}
            value={step}
            onChange={handleNumber(setStep)}
          />
        </label>
        <label>
          Animation (ms)
          <input
            type="number"
            min={0}
            value={animationDuration}
            onChange={handleNumber(setAnimationDuration)}
          />
        </label>
        <label>
          Infinite
          <input
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </label>
      </div>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
