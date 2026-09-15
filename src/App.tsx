import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

type NumberSetter = React.Dispatch<React.SetStateAction<number>>;

const changePositiveValue = (setValue: NumberSetter, allowZero = false) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);

    if (Number.isFinite(value) && (allowZero ? value >= 0 : value > 0)) {
      setValue(value);
    }
  };
};

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <main className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__settings">
        <label className="App__setting">
          <span>itemWidth</span>
          <input
            aria-label="itemWidth"
            htmlFor="itemId"
            id="itemId"
            min="1"
            onChange={changePositiveValue(setItemWidth)}
            type="number"
            value={itemWidth}
          />
        </label>

        <label className="App__setting">
          <span>frameSize</span>
          <input
            aria-label="frameSize"
            htmlFor="frameId"
            id="frameId"
            min="1"
            onChange={changePositiveValue(setFrameSize)}
            type="number"
            value={frameSize}
          />
        </label>

        <label className="App__setting">
          <span>step</span>
          <input
            aria-label="step"
            htmlFor="stepId"
            id="stepId"
            min="1"
            onChange={changePositiveValue(setStep)}
            type="number"
            value={step}
          />
        </label>

        <label className="App__setting">
          <span>animationDuration</span>
          <input
            aria-label="animationDuration"
            htmlFor="animationDurationId"
            id="animationDurationId"
            min="0"
            onChange={changePositiveValue(setAnimationDuration, true)}
            type="number"
            value={animationDuration}
          />
        </label>
      </div>

      <Carousel
        animationDuration={animationDuration}
        frameSize={frameSize}
        images={images}
        itemWidth={itemWidth}
        step={step}
      />
    </main>
  );
};

export default App;
