import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [images] = useState<string[]>([
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
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);
  const [infinite] = useState<boolean>(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title" className="App__title">Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="App__controls">
        <div className="App__inputs">
          <label htmlFor="frameId">Frame size</label>
          <input
            id="frameId"
            type="text"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
            placeholder="Enter frame size"
          />
          <p>Frame size: {frameSize}</p>
        </div>
        <div className="App__inputs">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            type="text"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            placeholder="Enter step"
          />
          <p>Step: {step}</p>
        </div>
        <div className="App__inputs">
          <label htmlFor="itemId">Item width</label>
          <input
            id="itemId"
            type="text"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
            placeholder="Enter item width"
          />
          <p>Item width: {itemWidth}</p>
        </div>
        <div className="App__inputs">
          <label htmlFor="animationId">Animation duration</label>
          <input
            id="animationId"
            type="text"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
            placeholder="Enter animation duration"
          />
          <p>Animation duration: {animationDuration}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
