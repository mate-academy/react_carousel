import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="controls">
        <div className="controls__group">
          <label className="controls__label" htmlFor="itemId">
            Item width:
          </label>
          <input
            id="itemId"
            type="number"
            className="controls__input"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label className="controls__label" htmlFor="frameId">
            Frame size:
          </label>
          <input
            id="frameId"
            type="number"
            className="controls__input"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label className="controls__label" htmlFor="stepId">
            Step:
          </label>
          <input
            id="stepId"
            type="number"
            className="controls__input"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label className="controls__label" htmlFor="durationId">
            Animation duration:
          </label>
          <input
            id="durationId"
            type="number"
            className="controls__input"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </div>

        {/* Новый переключатель infinite */}
        <div className="controls__group">
          <label className="controls__label" htmlFor="infiniteId">
            Infinite:
          </label>
          <input
            id="infiniteId"
            type="checkbox"
            className="controls__input"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </div>
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
