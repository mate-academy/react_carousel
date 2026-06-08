import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const initialImages = [
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
  const [images] = useState<string[]>(initialImages);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [infinite, setInfinite] = useState<boolean>(false);

  return (
    <div className="app">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="app__controls">
        <label htmlFor="itemId">
          Item Width (px):
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>
        <label htmlFor="frameId">
          Frame Size:
          <input
            type="number"
            value={frameSize}
            max={initialImages.length}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>
        <label htmlFor="stepId">
          Step:
          <input
            type="number"
            value={step}
            max={initialImages.length}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>
        <label htmlFor="animationId">
          Animation Duration (ms):
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
        <label htmlFor="infiniteId">
          Infinite:
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
