import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

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

// tried to create a custom hook in order to avoid repeating onChange handlers
function useInput(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(+e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

const App: React.FC = () => {
  const itemWidth = useInput(130);
  const frameSize = useInput(3);
  const step = useInput(3);
  const animationDuration = useInput(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy='title'>Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step.value}
        frameSize={frameSize.value}
        itemWidth={itemWidth.value}
        animationDuration={animationDuration.value}
      />

      <div className="App__settings">
        <label htmlFor="itemId">
          Enter item width
          <input
            {...itemWidth}
            type="number"
            name="itemWidth"
            id="itemId"
            className="App__setting"
          />
        </label>

        <label htmlFor="frameId">
          Enter frame size
          <input
            {...frameSize}
            type="number"
            name="frameSize"
            id="frameId"
            className="App__setting"
            min={1}
            max={images.length}
          />
        </label>

        <label htmlFor="stepId">
          Enter step
          <input
            {...step}
            type="number"
            name="step"
            id="stepId"
            className="App__setting"
            min={1}
            max={images.length - 1}
          />
        </label>

        <label htmlFor="animationId">
          Enter animation duration
          <input
            {...animationDuration}
            type="number"
            name="animationDuration"
            id="animationId"
            className="App__setting"
            min={0}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
