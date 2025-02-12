import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  const images = Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="box">
        <label htmlFor="itemId" className="label">
          Item Width
        </label>
        <input
          id="itemId"
          type="number"
          className="input"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />

        <label htmlFor="frameId" className="label">
          Frame Size
        </label>
        <input
          id="frameId"
          type="number"
          className="input"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />

        <label htmlFor="stepId" className="label">
          Step
        </label>
        <input
          id="stepId"
          type="number"
          className="input"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />

        <label htmlFor="animationId" className="label">
          Animation Duration (ms)
        </label>
        <input
          id="animationId"
          type="number"
          className="input"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />

        <label htmlFor="infiniteId" className="label">
          Infinite Scroll
        </label>
        <input
          id="infiniteId"
          type="checkbox"
          className="checkbox"
          checked={infinite}
          onChange={e => setInfinite(e.target.checked)}
        />
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
