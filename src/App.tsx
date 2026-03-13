import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images = Array.from({ length: 10 }, (_, i) => `/img/${i + 1}.png`);

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 data-cy="title">Карусель</h1>

      <div className="controls">
        <label>
          Item width
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </label>

        <label>
          Frame size
          <input
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </label>

        <label>
          Step
          <input
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </label>

        <label>
          Animation duration
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </label>
      </div>

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
