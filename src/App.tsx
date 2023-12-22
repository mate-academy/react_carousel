import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 className="title">{`Carousel with ${images.length} images`}</h1>

      <div className="form">
        <div className="form__item">
          <label className="form__label" htmlFor="itemId">
            Item width
          </label>

          <input
            className="form__input"
            type="number"
            id="itemId"
            value={itemWidth}
            min={10}
            max={390}
            step={10}
            onChange={(event) => setItemWidth(+(event.target.value))}
          />
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="frameId">
            Frame size
          </label>

          <input
            className="form__input"
            type="number"
            id="frameId"
            value={frameSize}
            min={1}
            max={images.length}
            step={1}
            onChange={(event) => setFrameSize(+(event.target.value))}
          />
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="stepId">
            Step
          </label>

          <input
            className="form__input"
            type="number"
            id="stepId"
            value={step}
            min={1}
            max={images.length}
            step={1}
            onChange={(event) => setStep(+(event.target.value))}
          />
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="animationId">
            Animation duration
          </label>

          <input
            className="form__input"
            type="number"
            id="animationId"
            value={animationDuration}
            min={100}
            max={5000}
            step={100}
            onChange={(event) => setAnimationDuration(+(event.target.value))}
          />
        </div>

        <div className="form__item">
          <label className="form__label" htmlFor="infiniteId">
            Infinite
          </label>

          <input
            className="form__input"
            type="checkbox"
            id="infiniteId"
            checked={infinite}
            onChange={(event) => setInfinite(event.target.checked)}
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
