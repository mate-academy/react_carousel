import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
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

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinity, setInfinity] = useState(false);

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <label htmlFor="itemId">
        Item Width:
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={event => setItemWidth(+event.target.value)}
        />
      </label>

      <label htmlFor="frameId">
        Frame Size:
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={event => setFrameSize(+event.target.value)}
        />
      </label>

      <label htmlFor="stepId">
        Step:
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={event => setStep(+event.target.value)}
        />
      </label>

      <label htmlFor="animationId">
        Animation duration:
        <input
          id="animationId"
          type="number"
          value={animationDuration}
          onChange={event => setAnimationDuration(+event.target.value)}
        />
      </label>

      <label>
        Infinity:
        <select
          name="infinity"
          value={infinity.toString()}
          onChange={e => setInfinity(e.target.value === 'true')}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinity={infinity}
      />
    </div>
  );
};

export default App;
