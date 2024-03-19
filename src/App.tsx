import React, { useState } from 'react';
import './App.scss';
// eslint-disable-next-line import/no-named-as-default
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const App: React.FC<State> = () => {
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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="Options">
        <div className="stepSelector">
          <label htmlFor="stepId" className="Options__label">
            Step:
            <input
              type="number"
              id="stepId"
              className="Options__form-control"
              min={1}
              max={10}
              value={step}
              onChange={event => setStep(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="frameSizeSelector">
          <label htmlFor="frameId" className="Options__label">
            Frame Size:
            <input
              type="number"
              id="frameId"
              className="Options__form-control"
              min={1}
              max={10}
              value={frameSize}
              onChange={event => setFrameSize(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="widthSelector">
          <label htmlFor="itemId" className="Options__label">
            Item width:
            <input
              type="number"
              id="itemId"
              className="Options__form-control"
              min={130}
              max={260}
              step={10}
              value={itemWidth}
              onChange={event => setItemWidth(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="animationDurationSelector">
          <label htmlFor="animationId" className="Options__label">
            Animation Duration:
            <input
              type="number"
              id="animationId"
              className="Options__form-control"
              min={100}
              max={5000}
              step={100}
              value={animationDuration}
              onChange={event =>
                setAnimationDuration(Number(event.target.value))
              }
            />
          </label>
        </div>
        <div className="infiniteSelector">
          <label htmlFor="infiniteId" className="Options__label">
            Infinite:
            <input
              type="checkbox"
              id="infiniteId"
              className="Options__form-control"
              checked={infinite}
              onChange={event => setInfinite(event.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default App;
