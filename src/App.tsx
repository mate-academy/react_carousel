import React, { useState, useEffect } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(3);
  const [frameSize, setFrameSize] = useState<number>(3);
  const [itemWidth, setItemWidth] = useState<number>(130);
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

  useEffect(() => {
    document.title = `Carousel with ${images.length} images`;
  }, [images.length]);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div>
        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="itemId">Item width</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="frameId">Frame size</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="durationId">Animation duration</label>
        <input
          id="durationId"
          type="number"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />
      </div>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
