import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="controls">
        <label className="controls__label" htmlFor="itemId">
          Item Width:
          <input
            id="itemId"
            min={60}
            max={400}
            className="controls__input"
            type="number"
            value={itemWidth}
            onChange={event => setItemWidth(Number(event.target.value))}
          />
        </label>
        <label className="controls__label" htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            min={1}
            max={10}
            className="controls__input"
            type="number"
            value={frameSize}
            onChange={event => setFrameSize(Number(event.target.value))}
          />
        </label>
        <label className="controls__label" htmlFor="stepId">
          Step:
          <input
            id="stepId"
            min={1}
            max={9}
            className="controls__input"
            type="number"
            value={step}
            onChange={event => setStep(Number(event.target.value))}
          />
        </label>
        <label className="controls__label">
          Animation Duration:
          <input
            min={100}
            max={5000}
            className="controls__input"
            type="number"
            value={animationDuration}
            onChange={event => setAnimationDuration(Number(event.target.value))}
          />
        </label>
        <label className="controls__label">
          Infinite:
          <input
            className="controls__checkbox"
            type="checkbox"
            checked={infinite}
            onChange={event => setInfinite(event.target.checked)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
