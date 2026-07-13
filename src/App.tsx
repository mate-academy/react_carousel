import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App = () => {
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(1000);

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
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="App__controls">
        <label htmlFor="itemId">
          <strong>Item Width (px):</strong>
        </label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event => setItemWidth(+event.target.value)}
        />

        <label htmlFor="frameId">
          <strong>Frame Size (px):</strong>
        </label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event => setFrameSize(+event.target.value)}
        />

        <label htmlFor="stepId">
          <strong>Step:</strong>
        </label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setStep(+event.target.value)}
        />

        <label htmlFor="animationDurationId">
          <strong>Animation Duration (ms):</strong>
        </label>
        <input
          id="animationDurationId"
          type="number"
          value={animationDuration}
          onChange={event => setAnimationDuration(+event.target.value)}
        />
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
      />
    </div>
  );
};

export default App;
