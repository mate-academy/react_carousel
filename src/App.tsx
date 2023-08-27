import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
    images: [
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
    ],
  };

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      {/* eslint-disable-next-line */}
      <h1 className="app__title" data-cy="title">Carousel with {state.images.length} images</h1>

      <Carousel
        images={state.images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="app__form">
        <label>
          Step:
          <input
            className="app__input"
            type="number"
            min="1"
            max={state.images.length}
            value={step}
            onChange={(e) => setStep(+e.target.value)}
          />
        </label>

        <label>
          Count emoticons:
          <input
            className="app__input"
            type="number"
            min="1"
            max={state.images.length}
            value={frameSize}
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </label>

        <label>
          Item width:
          <input
            className="app__input"
            type="number"
            min="100"
            max="200"
            value={itemWidth}
            onChange={(e) => setItemWidth(+e.target.value)}
          />
        </label>

        <label>
          Animation Duration:
          <input
            className="app__input"
            type="number"
            min="100"
            max="5000"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            checked={infinite}
            onChange={(e) => setInfinite(e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
