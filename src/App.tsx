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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="itemId">Item Width (px):</label>
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
            min="50"
            max="300"
          />
        </div>

        <div className="control-group">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
            min="1"
            max="10"
          />
        </div>

        <div className="control-group">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            min="1"
            max="5"
          />
        </div>

        <div className="control-group">
          <label htmlFor="animationDuration">Animation Duration (ms):</label>
          <input
            id="animationDuration"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
            min="100"
            max="3000"
            step="100"
          />
        </div>
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
