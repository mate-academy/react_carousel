import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const images = [
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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <form className="App__form">
        <label htmlFor="itemWidth">
          Item Width:
          <input
            className="App__input"
            type="number"
            name="itemWidth"
            id="itemWidth"
            min={60}
            max={250}
            value={itemWidth}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setItemWidth(+event.target.value);
            }}
          />
        </label>
        <label htmlFor="frameSize">
          Frame Size:
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
        <label htmlFor="step">
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
        <label htmlFor="animationDuration">
          Animation Duration:
          <input
            className="App__input"
            type="number"
            name="animationDuration"
            id="animationDuration"
            min={300}
            max={5000}
            step={100}
            value={animationDuration}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnimationDuration(+event.target.value);
            }}
          />
        </label>
        <button
          type="button"
          className="App__button"
          onClick={() => {
            setInfinite(!infinite);
          }}
        >
          {infinite
            ? ('Disable infinite scrolling')
            : ('Enable infinite scrolling')}
        </button>
      </form>
    </div>
  );
};
