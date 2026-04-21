import React, { useState } from 'react';
import { Carousel } from './components/Carousel';
import './App.scss';

const IMAGES = Array.from({ length: 10 }, (_, i) => `./img/${i + 1}.png`);

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [duration, setDuration] = useState(1000);

  return (
    <div className="app">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls-panel">
        <div className="control-group">
          <label htmlFor="itemId">itemWidth</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor="frameId">frameSize</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor="stepId">step</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </div>

        <div className="control-group">
          <label htmlFor="animationDuration">animationDuration</label>
          <input
            id="animationDuration"
            type="number"
            value={duration}
            onChange={e => setDuration(+e.target.value)}
          />
        </div>
      </div>

      <Carousel
        images={IMAGES}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={duration}
        infinite={false}
      />
    </div>
  );
};

export default App;
