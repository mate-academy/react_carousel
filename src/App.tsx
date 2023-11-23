import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

const App: React.FC = () => {
  const [boxWidth, setBoxWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const getMaxFrames = Math.floor(1300 / boxWidth);

  const handleBoxWidth = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBoxWidth(+event.target.value);
  };

  const handleFrameSize = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFrameSize(+event.target.value);
  };

  const handleStep = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStep(+event.target.value);
  };

  const handleAnimationDuration = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnimationDuration(+event.target.value);
  };

  const handleInfinite = () => {
    setInfinite(!infinite);
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__form" action="/">

        <label className="App__label">
          Box Width:
          <input
            className="App__input"
            type="number"
            min={130}
            max={1300}
            step={100}
            value={boxWidth}
            onChange={handleBoxWidth}
          />
        </label>

        <label className="App__label">
          Frame Size:
          <input
            className="App__input"
            type="number"
            min={1}
            max={getMaxFrames}
            step={1}
            value={frameSize}
            onChange={handleFrameSize}
          />
        </label>

        <label className="App__label">
          Step:
          <input
            className="App__input"
            type="number"
            min={1}
            max={10}
            step={1}
            value={step}
            onChange={handleStep}
          />
        </label>

        <label className="App__label">
          Animation Duration:
          <input
            className="App__input"
            type="number"
            min={500}
            max={5000}
            step={500}
            value={animationDuration}
            onChange={handleAnimationDuration}
          />
        </label>

        <label className="App__label">
          Infinite:
          <input
            className="App__input App__bigInpute"
            type="checkbox"
            onChange={handleInfinite}
          />
        </label>

      </form>

      <Carousel
        images={images}
        boxWidth={boxWidth}
        frameSize={frameSize}
        step={step}
        // animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
