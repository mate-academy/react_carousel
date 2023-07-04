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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const numNormalizer = (num: number): number => (num < 0 ? 0 : num);

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

      <label htmlFor="itemId">
        <input
          type="text"
          placeholder="itemWidth"
          id="itemId"
          onChange={(e) => setItemWidth(numNormalizer(Number(e.target.value))
            || 130)}
        />
      </label>
      <label htmlFor="frameId">
        <input
          type="text"
          id="frameId"
          placeholder="frameSize"
          onChange={(e) => setFrameSize(numNormalizer(Number(e.target.value))
            || 3)}
        />
      </label>
      <label htmlFor="stepId">
        <input
          type="text"
          id="stepId"
          placeholder="step"
          onChange={(e) => setStep(numNormalizer(Number(e.target.value)) || 3)}
        />
      </label>
      <input
        type="text"
        placeholder="animationDuration"
        onChange={(e) => setAnimationDuration(
          numNormalizer(Number(e.target.value)) || 1000,
        )}
      />

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
