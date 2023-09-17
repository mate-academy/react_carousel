/* eslint-disable jsx-a11y/label-has-associated-control */
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

  return (
    <div className="App">
      <h1>
        Carousel with
        {' '}
        {images.length}
        {' '}
        images
      </h1>

      <div>
        <label>Item Width: </label>
        <input
          type="number"
          value={itemWidth}
          onChange={(e) => setItemWidth(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Frame Size: </label>
        <input
          type="number"
          value={frameSize}
          onChange={(e) => setFrameSize(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Animation Duration (ms): </label>
        <input
          type="number"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
        />
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        infinite={false}
      />
    </div>
  );
};

export default App;
