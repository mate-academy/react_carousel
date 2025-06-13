import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel</h1>

      <form className="controls" style={{ marginBottom: 20 }}>
        <div>
          <label htmlFor="itemId">Item width (px): </label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
            min={50}
            max={300}
          />
        </div>

        <div>
          <label htmlFor="frameId">Frame size (number of images): </label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
            min={1}
            max={10}
          />
        </div>

        <div>
          <label htmlFor="stepId">Step (images per scroll): </label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            min={1}
            max={10}
          />
        </div>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
      />
    </div>
  );
};

export default App;
