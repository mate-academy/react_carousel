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
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="app">
      <h1 className="app__title" data-cy="title">
        Carousel with {images.length} images
      </h1>

      <div className="app__controls">
        <label className="app__field" htmlFor="itemId">
          Item Width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>

        <label className="app__field" htmlFor="frameId">
          Frame Size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>

        <label className="app__field" htmlFor="stepId">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>

        <label className="app__field" htmlFor="durationId">
          Animation Duration:
          <input
            id="durationId"
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>

        <label className="app__field" htmlFor="infiniteId">
          Infinite:
          <input
            id="infiniteId"
            type="checkbox"
            checked={infinite}
            onChange={e => setInfinite(e.target.checked)}
          />
        </label>
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
