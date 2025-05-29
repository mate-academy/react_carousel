import { useState } from 'react';
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

export const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animDuration, setAnimDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="itemId">
        Image width
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event => setItemWidth(+event.target.value)}
        />
      </label>

      <label htmlFor="frameId">
        Frame size
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event => setFrameSize(+event.target.value)}
        />
      </label>

      <label htmlFor="stepId">
        Step
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setStep(+event.target.value)}
        />
      </label>

      <label htmlFor="animationId">
        Animation duration
        <input
          id="animationId"
          type="number"
          value={animDuration}
          onChange={event => setAnimDuration(+event.target.value)}
        />
      </label>

      <label htmlFor="infinite">
        Make carusel infinite
        <input
          id="infinite"
          type="checkbox"
          checked={isInfinite}
          onChange={() => setIsInfinite(prev => !prev)}
        />
      </label>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        animDuration={animDuration}
        step={step}
        frameSize={frameSize}
        isInfinite={isInfinite}
      />
    </div>
  );
};

export default App;
