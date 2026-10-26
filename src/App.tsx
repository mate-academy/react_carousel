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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <form className="App__settings">
        <label htmlFor="itemId" className="App__field">
          Item width
          <input
            id="itemId"
            type="number"
            min={1}
            value={itemWidth}
            onChange={event => setItemWidth(Number(event.target.value))}
          />
        </label>

        <label htmlFor="frameId" className="App__field">
          Frame size
          <input
            id="frameId"
            type="number"
            min={1}
            max={images.length}
            value={frameSize}
            onChange={event => setFrameSize(Number(event.target.value))}
          />
        </label>

        <label htmlFor="stepId" className="App__field">
          Step
          <input
            id="stepId"
            type="number"
            min={1}
            max={images.length}
            value={step}
            onChange={event => setStep(Number(event.target.value))}
          />
        </label>

        <label htmlFor="animationId" className="App__field">
          Animation duration (ms)
          <input
            id="animationId"
            type="number"
            min={0}
            step={100}
            value={animationDuration}
            onChange={event => setAnimationDuration(Number(event.target.value))}
          />
        </label>

        <label htmlFor="infiniteId" className="App__field">
          Infinite
          <input
            id="infiniteId"
            type="checkbox"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
      </form>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
