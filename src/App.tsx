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

interface Props {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const App: React.FC<Props> = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      <h1 data-cy="title" className="title">
        Carousel with {images.length} images
      </h1>

      <div className="tile">
        <div className="form">
          <label htmlFor="stepId" className="label">
            Step
          </label>
          <div>
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

        <div className="form">
          <label htmlFor="frameId" className="label">
            Frame Size
          </label>
          <div>
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

        <div className="form">
          <label htmlFor="itemId" className="label">
            Item width
          </label>
          <div>
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

        <div className="form">
          <label htmlFor="animationDuration" className="label">
            Animation duration
          </label>
          <div>
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

        <div className="form">
          <div>
            <label htmlFor="infinite" className="label checkbox">
              <input
                id="infinite"
                type="checkbox"
                checked={infinite}
                onChange={e => setInfinite(e.target.checked)}
              />
              Infinite
            </label>
          </div>
        </div>
      </div>

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
