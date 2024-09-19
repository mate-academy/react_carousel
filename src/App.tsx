import React, { useState } from 'react';
import 'bulma';
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
    <div className="app">
      <h1 className="title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <div className="box">
        <div className="field">
          <label className="label" htmlFor="stepId">
            Step
          </label>
          <div className="control">
            <input
              className="input"
              id="stepId"
              type="number"
              value={step}
              min="1"
              max={images.length}
              onChange={e => setStep(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="frameId">
            Frame Size
          </label>
          <div className="control">
            <input
              className="input"
              id="frameId"
              type="number"
              value={frameSize}
              min="1"
              max={images.length}
              onChange={e => setFrameSize(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="itemId">
            Item Width
          </label>
          <div className="control">
            <input
              className="input"
              id="itemId"
              type="number"
              value={itemWidth}
              min="130"
              max="200"
              onChange={e => setItemWidth(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="animationDuration">
            Animation Duration
          </label>
          <div className="control">
            <input
              className="input"
              id="animationDuration"
              type="number"
              value={animationDuration}
              min="100"
              max="10000"
              onChange={e => setAnimationDuration(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="label checkbox" htmlFor="infinite">
              <input
                type="checkbox"
                id="infinite"
                checked={infinite}
                onChange={e => setInfinite(e.target.checked)}
              />
              &nbsp;Infinite
            </label>
          </div>
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
