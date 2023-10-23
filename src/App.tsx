import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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
  const [width, setWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);
  const [indexCurrImg, setIndexCurrImg] = useState(0);

  function handleFrameSize(e: React.ChangeEvent<HTMLInputElement>) {
    setFrameSize(+e.target.value);
    setIndexCurrImg(0);
  }

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__inputs">
        <label htmlFor="itemId">
          Item width
          <input
            id="itemId"
            type="number"
            step={1}
            className="App__input"
            value={width}
            onChange={e => setWidth(+e.target.value)}
          />
        </label>

        <label htmlFor="frameId">
          Frame size
          <input
            id="frameId"
            type="number"
            className="App__input"
            value={frameSize}
            min={1}
            max={10}
            onChange={handleFrameSize}
          />
        </label>

        <label htmlFor="stepId">
          Step
          <input
            id="stepId"
            type="number"
            className="App__input"
            value={step}
            min={1}
            max={5}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label htmlFor="animationId">
          Animation duration
          <input
            id="animationId"
            type="number"
            className="App__input"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label>
          Infinite
          <input
            type="checkbox"
            className="App__input"
            onChange={() => setIsInfinite(!isInfinite)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={step}
        width={width}
        duration={animationDuration}
        frameSize={frameSize}
        isInfinite={isInfinite}
        indexCurrImg={indexCurrImg}
        setIndexCurrImg={setIndexCurrImg}
      />
    </div>
  );
};

export default App;
