import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  const images = Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <form className="form">
        <label htmlFor="itemId">
          itemWidth:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
            data-cy="itemWidth-input"
          />
        </label>

        <label htmlFor="frameId">
          frameSize:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
            data-cy="frameSize-input"
          />
        </label>

        <label htmlFor="stepId">
          step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            data-cy="step-input"
          />
        </label>

        <label>
          animationDuration:
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
