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

const App: React.FC = () => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1
        className="title"
        data-cy="title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <form className="App__form">
        <label
          htmlFor="itemWidth"
          className="App__label"
        >
          Item width:

          <input
            className="App__input"
            type="number"
            name="itemWidth"
            id="itemWidth"
            min={80}
            max={200}
            value={itemWidth}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setItemWidth(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="frameSize"
          className="App__label"
        >
          Frame size:

          <input
            className="App__input"
            type="number"
            name="frameSize"
            id="frameSize"
            min={1}
            max={10}
            value={frameSize}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFrameSize(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="step"
          className="App__label"
        >
          Step:

          <input
            className="App__input"
            type="number"
            name="step"
            id="step"
            min={1}
            max={9}
            value={step}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setStep(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="animationDuration"
          className="App__label"
        >
          Animation duration:

          <input
            className="App__input"
            type="number"
            name="animationDuration"
            id="animationDuration"
            min={250}
            max={5000}
            step={250}
            value={animationDuration}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnimationDuration(+event.target.value);
            }}
          />
        </label>
      </form>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
