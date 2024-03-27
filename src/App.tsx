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
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title" data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <form action="/" className="form">
        <label className="form__label" htmlFor="itemId">
          Item Width
          <input
            type="number"
            className="input is-primary"
            id="itemId"
            name="itemWidth"
            min={130}
            max={260}
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label className="form__label" htmlFor="frameId">
          Frame Size
          <input
            type="number"
            className="input is-primary"
            name="frameSize"
            id="frameId"
            min={1}
            max={images.length}
            step={1}
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="stepId" className="form__label">
          Step
          <input
            type="number"
            className="input is-primary"
            name="step"
            id="stepId"
            min={1}
            max={images.length}
            step={1}
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label className="form__label">
          Animation Duration
          <input
            type="number"
            className="input is-primary"
            name="animationDuration"
            id="animationDuration"
            min={500}
            max={3000}
            step={500}
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label className="form__label">
          Infinite
          <input
            type="checkbox"
            className="checkbox"
            name="infinite"
            id="infinite"
            onChange={e => setInfinite(e.target.checked)}
            checked={infinite}
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
