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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title'>Carousel with {images.length} images</h1>

      <form action="GET">
        <fieldset>
          <label htmlFor="itemId">Item Width</label>
          <input
            type="text"
            id="itemId"
            value={itemWidth}
            onChange={e => setItemWidth(Number(e.target.value))}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="frameId">Frame Size</label>
          <input
            type="text"
            id="frameId"
            value={frameSize}
            onChange={e => setFrameSize(Number(e.target.value))}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="stepId">Step</label>
          <input
            type="text"
            id="stepId"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="animationDuration">Animation Duration</label>
          <input
            type="text"
            id="animationDuration"
            value={animationDuration}
            onChange={e => setAnimationDuration(Number(e.target.value))}
          />
        </fieldset>
      </form>

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
