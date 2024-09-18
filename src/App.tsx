import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

export const App = () => {
  // Używamy useState do przechowywania listy obrazów
  const [images] = useState([
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

  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="stepId">Set step: </label>
      <input
        type="number"
        id="stepId"
        value={step}
        onChange={event => setStep(Math.round(Number(event.target.value)))}
      />

      <label htmlFor="itemId">Set item width: </label>
      <input
        type="number"
        id="itemId"
        value={itemWidth}
        onChange={event => {
          setItemWidth(Math.round(Number(event.target.value)));
        }}
      />

      <label htmlFor="frameId">Set frame size: </label>
      <input
        type="number"
        id="frameId"
        value={frameSize}
        onChange={event => {
          setFrameSize(Math.round(Number(event.target.value)));
        }}
      />

      <label htmlFor="animationDuration">Set animation duration: </label>
      <input
        type="number"
        value={animationDuration}
        onChange={event => {
          setAnimationDuration(Math.round(Number(event.target.value)));
        }}
      />

      <button
        className="toggleButton"
        type="button"
        onClick={() => {
          setInfinite(!infinite);
        }}
      >
        Toogle Infinite
      </button>
      {/* Przekazanie images jako props do Carousel */}
      <Carousel
        images={images}
        step={step}
        itemWidth={itemWidth}
        frameSize={frameSize}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
