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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <div className="settings">
        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          type="number"
          min="50"
          max="300"
          step="10"
          name="itemWidth"
          value={itemWidth}
          // onChange={handleSettingsChange}
          onChange={e => setItemWidth(+e.target.value)}
        />

        <label htmlFor="frameSize">Frame Size:</label>
        <input
          id="frameSize"
          type="number"
          min="1"
          max={`${images.length}`}
          step="1"
          name="frameSize"
          value={frameSize}
          onChange={e => setFrameSize(+e.target.value)}
        />

        <label htmlFor="step">Step:</label>
        <input
          id="step"
          type="number"
          min="1"
          max={`${images.length}`}
          step="1"
          name="step"
          value={step}
          onChange={e => setStep(+e.target.value)}
        />

        <label htmlFor="animationDuration">Animation Duration:</label>
        <input
          id="animationDuration"
          type="number"
          min="100"
          max="5000"
          step="100"
          name="animationDuration"
          value={animationDuration}
          onChange={e => setAnimationDuration(+e.target.value)}
        />

        <label htmlFor="infinite">Infinite:</label>
        <input
          id="infinite"
          type="checkbox"
          name="infinite"
          checked={infinite}
          onChange={e => setInfinite(e.target.checked)}
        />

        {/* <Carousel images={images} /> */}
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
