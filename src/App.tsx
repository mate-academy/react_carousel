import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const images: string[] = [
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
  const [curStep, setCurStep] = useState(3);
  const [curFrameSize, setCurFrameSize] = useState(3);
  const [curItemWidth, setCurItemWidth] = useState(130);
  const [curAnimationDuration, setCurAnimationDuration] = useState(1000);
  const toInt = (v: string) => {
    const n = parseInt(v, 10);

    return Number.isNaN(n) ? 0 : n;
  };

  const clamp = (n: number, min: number, max = Number.POSITIVE_INFINITY) =>
    Math.min(Math.max(n, min), max);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={curStep}
        frameSize={curFrameSize}
        itemWidth={curItemWidth}
        animationDuration={curAnimationDuration}
        infinite={false}
      />

      <div>
        <label htmlFor="itemId">
          itemWidth
          <input
            id="itemId"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            pattern="\d*"
            value={curItemWidth}
            data-cy="width-input"
            onChange={e => setCurItemWidth(clamp(toInt(e.target.value), 1))}
          />
        </label>
        <label htmlFor="frameId">
          frameSize
          <input
            id="frameId"
            min={1}
            step={1}
            inputMode="numeric"
            pattern="\d*"
            type="number"
            value={curFrameSize}
            data-cy="frame-input"
            onChange={e => setCurFrameSize(clamp(toInt(e.target.value), 1))}
          />
        </label>
        <label htmlFor="stepId">
          step
          <input
            id="stepId"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            pattern="\d*"
            value={curStep}
            data-cy="step-input"
            onChange={e => setCurStep(clamp(toInt(e.target.value), 1))}
          />
        </label>
        <label htmlFor="durationId">
          animationDuration
          <input
            id="durationId"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            pattern="\d*"
            value={curAnimationDuration}
            data-cy="animation-input"
            onChange={e =>
              setCurAnimationDuration(clamp(toInt(e.target.value), 0))
            }
          />
        </label>
      </div>
    </div>
  );
};

export default App;
