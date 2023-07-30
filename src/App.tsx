import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const state: State = {
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

  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [isInfinite, setIsInfinite] = useState(false);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className='App__title' data-cy='title'>Carousel with {state.images.length} images</h1>

      <div className="App__inputs">
        <label>
          Step:
          <input
            type="number"
            value={step}
            min={1}
            onChange={(event) => setStep(+event.target.value)}
          />
        </label>

        <label>
          Frame Size:
          <input
            type="number"
            value={frameSize}
            min={1}
            max={state.images.length}
            onChange={(event) => setFrameSize(+event.target.value)}
          />
        </label>

        <label>
          Item Width:
          <input
            type="number"
            value={itemWidth}
            onChange={(event) => setItemWidth(+event.target.value)}
          />
        </label>

        <label>
          Animation Duration:
          <input
            type="number"
            value={animationDuration}
            onChange={(event) => setAnimationDuration(+event.target.value)}
          />
        </label>

        <label>
          Infinite:
          <input
            type="checkbox"
            checked={isInfinite}
            onChange={(event) => setIsInfinite(!!event.target.checked)}
          />
        </label>
      </div>

      <Carousel
        images={state.images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={isInfinite}
      />
    </div>

  );
};

export default App;
