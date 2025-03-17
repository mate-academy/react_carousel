import React, { useState } from 'react';
import './Styles/reset.scss';
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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <form>
        <label htmlFor="itemId">
          Elements width
          <input
            type="number"
            id="itemId"
            value={itemWidth}
            onChange={e => setItemWidth(
              Math.max(1, Number(e.target.value))
            )}
          />
        </label>

        <label htmlFor="frameId">
          Amount of visible elements
          <input
            type="number"
            id="frameId"
            value={frameSize}
            onChange={e => setFrameSize(
              Math.min(Math.max(1, Number(e.target.value)), images.length)
            )}
          />
        </label>

        <label htmlFor="stepId">
          Amount of new elements
          <input
            type="number"
            id="stepId"
            value={step}
            onChange={e => setStep(
              Math.min(Math.max(1, Number(e.target.value)), images.length - 1)
            )}
          />
        </label>

        <label htmlFor="animationDuration">
          Scrolling time in ms
          <input
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={e => setAnimationDuration(
              Math.max(0, Number(e.target.value))
            )}
          />
        </label>
      </form>

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
