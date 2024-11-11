import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <form className="App__form">
        <label htmlFor="itemId" className="App__form--label">
          Item Width:
          <input
            id="itemId"
            className="App__form--input"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>
        <label htmlFor="frameId" className="App__form--label">
          Frame Size:
          <input
            id="frameId"
            className="App__form--input"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>
        <label htmlFor="stepId" className="App__form--label">
          Step:
          <input
            id="stepId"
            className="App__form--input"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>
        <label htmlFor="durationId" className="App__form--label">
          Animation Duration (ms):
          <input
            id="durationId"
            className="App__form--input"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
        <label htmlFor="infiniteId" className="App__form--label">
          Infinite:
          <input
            id="infiniteId"
            className="App__form--input"
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
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
