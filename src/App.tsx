import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [infinite, setInfinite] = useState(false);

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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      {}
      <label htmlFor="stepId">Step:</label>
      <input
        id="stepId"
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />

      <label htmlFor="itemId">Item Width:</label>
      <input
        id="itemId"
        type="number"
        value={itemWidth}
        onChange={(e) => setItemWidth(Number(e.target.value))}
      />

      <label htmlFor="frameId">Frame Size:</label>
      <input
        id="frameId"
        type="number"
        value={frameSize}
        onChange={(e) => setFrameSize(Number(e.target.value))}
      />

      <label>
        <input
          type="checkbox"
          checked={infinite}
          onChange={() => setInfinite(!infinite)}
        />
        Infinite Scroll
      </label>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={1000}
        infinite={infinite}
      />
    </div>
  );
};

export default App;
