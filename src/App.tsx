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
  const [fnimationDuration, setFnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title" className="title">
        Carousel with {images.length} images
      </h1>

      <div className="settings">
        <h2 className="settings__title">Settings:</h2>

        <div className="settings__field">
          <label className="settings__label" htmlFor="itemId">
            Item Width
          </label>

          <input
            id="itemId"
            name="itemWidth"
            className="settings__input settings__input--width"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </div>

        <div className="settings__field">
          <label className="settings__label" htmlFor="frameId">
            Frame Size
          </label>

          <input
            id="frameId"
            name="frameSize"
            className="settings__input settings__input--frame-size"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </div>

        <div className="settings__field">
          <label className="settings__label" htmlFor="stepId">
            Step
          </label>

          <input
            id="stepId"
            name="step"
            className="settings__input settings__input--step"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </div>

        <div className="settings__field">
          <label className="settings__label" htmlFor="fnimationDuration">
            Animation Duration
          </label>

          <input
            id="fnimationDuration"
            name="fnimationDuration"
            className="settings__input settings__input--animation-duration"
            type="number"
            value={fnimationDuration}
            onChange={e => setFnimationDuration(Number(e.target.value))}
          />
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={fnimationDuration}
        infinite={infinite}
      />

      <label className="infinite__label">
        Infinite
        <input
          className="infinite__input"
          type="checkbox"
          checked={infinite}
          onChange={e => setInfinite(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default App;
