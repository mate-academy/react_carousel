import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const state = {
  images: [
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
  ],
};

const App: React.FC = () => {
  const { images } = state;

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
        <h1 data-cy = 'title'>Carousel with {images.length} images</h1>

      <label htmlFor="itemId">
        &nbsp;Enter itemWidth &nbsp;
        <input
          type="text"
          value={itemWidth}
          onChange={e => setItemWidth(+e.target.value)}
        />
      </label>

      <label htmlFor="frameId">
        &nbsp;Enter frameSize &nbsp;
        <input
          type="text"
          value={frameSize}
          onChange={e => setFrameSize(+e.target.value)}
        />
      </label>

      <label htmlFor="stepId">
        &nbsp;Enter step &nbsp;
        <input
          type="text"
          value={step}
          onChange={e => setStep(+e.target.value)}
        />
      </label>

      <label htmlFor="durationId">
        &nbsp;Enter animationDuration &nbsp;
        <input
          type="text"
          value={animationDuration}
          onChange={e => setAnimationDuration(+e.target.value)}
        />
      </label>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={true}
      />
    </div>
  );
};

export default App;
